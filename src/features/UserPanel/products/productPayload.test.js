import { describe, expect, it, vi } from "vitest";
import {
  buildProductUpdatePayload,
  submitProductUpdate,
} from "./productPayload";

const product = {
  id: 12,
  images: [{ id: "primary" }, { id: "secondary", url: "/secondary.webp" }],
  options: [{ name: "colors", values: [{ id: 1, value: "red" }] }],
};

describe("buildProductUpdatePayload", () => {
  it("edits arbitrary canonical option names and can remove groups", () => {
    const original = {
      ...product,
      options: [
        { name: "color", values: [{ value: "red" }] },
        { name: "material", values: [{ value: "cotton" }] },
      ],
    };
    const values = {
      price: "12.50",
      category: 3,
      optionGroups: [{ name: "color", values: "red, blue" }],
    };
    expect(
      buildProductUpdatePayload({ product: original, values }).options,
    ).toEqual([{ name: "color", values: ["red", "blue"] }]);
  });
  it("omits unchanged options and preserves canonical value types", () => {
    const payload = buildProductUpdatePayload({
      product,
      values: {
        title: "Phone",
        price: "12.50",
        discount: "5",
        category: "3",
        postType: "2",
        isAvailable: true,
        optionGroups: [{ name: "colors", values: "red" }],
      },
    });
    expect(payload.options).toBeUndefined();
    expect(payload.price).toBe("12.50");
    expect(payload.discount).toBe(5);
  });

  it("replaces the primary image while retaining other media ids", () => {
    const payload = buildProductUpdatePayload({
      product,
      values: {
        title: "Phone",
        price: "12.50",
        category: "3",
        postType: "2",
        isAvailable: true,
        image: [{}],
      },
      uploadedImages: [{ id: "new-primary" }],
    });
    expect(payload.imageIds).toEqual(["new-primary", "secondary"]);
  });

  it("awaits production uploads before saving", async () => {
    let uploaded = false;
    const upload = vi.fn(async () => {
      await Promise.resolve();
      uploaded = true;
      return { id: "uploaded" };
    });
    const save = vi.fn((payload) => {
      expect(uploaded).toBe(true);
      return payload;
    });
    await submitProductUpdate({
      product,
      values: {
        title: "x",
        price: "1",
        category: "1",
        postType: "1",
        isAvailable: true,
        image: [{}],
      },
      upload,
      save,
    });
    expect(upload).toHaveBeenCalled();
    expect(save.mock.calls[0][0].imageIds[0]).toBe("uploaded");
  });
});
