import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import DialogHost from "../ui/dialogs/DialogHost";
import AppDialog from "../ui/dialogs/AppDialog";
import { showDialog } from "../ui/dialogs/dialogService";

describe("project dialogs", () => {
  it("cancels safely, renders text literally, and restores trigger focus", async () => {
    render(
      <>
        <button
          onClick={() =>
            showDialog({
              title: "Delete item?",
              description: "<script>unsafe</script>",
              confirmation: true,
            })
          }
        >
          Open
        </button>
        <DialogHost />
      </>,
    );
    const trigger = screen.getByText("Open");
    trigger.focus();
    fireEvent.click(trigger);
    expect(await screen.findByRole("dialog")).toHaveAccessibleName(
      "Delete item?",
    );
    expect(screen.getByText("<script>unsafe</script>")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toHaveFocus();
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  });
  it("resolves queued requests independently", async () => {
    render(<DialogHost />);
    let first, second;
    act(() => {
      first = showDialog({ title: "First", confirmation: true });
      second = showDialog({ title: "Second", confirmation: true });
    });
    fireEvent.click(await screen.findByRole("button", { name: "Confirm" }));
    await expect(first).resolves.toBe(true);
    await screen.findByText("Second");
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    await expect(second).resolves.toBe(false);
  });
  it.each(["escape", "close"])(
    "resolves false on %s dismissal",
    async (method) => {
      render(<DialogHost />);
      let result;
      act(() => {
        result = showDialog({ title: "Dismiss me", confirmation: true });
      });
      const dialog = await screen.findByRole("dialog");
      if (method === "escape")
        fireEvent.keyDown(dialog, { key: "Escape", code: "Escape" });
      else
        fireEvent.click(screen.getByRole("button", { name: "Close dialog" }));
      await expect(result).resolves.toBe(false);
    },
  );
  it("prevents dismissal and submission while pending", () => {
    const confirm = vi.fn(),
      close = vi.fn();
    render(
      <AppDialog
        open
        title="Saving"
        pending
        onConfirm={confirm}
        onClose={close}
        confirmation
      />,
    );
    expect(screen.getByRole("button", { name: "Saving…" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDisabled();
    fireEvent.keyDown(screen.getByRole("dialog"), {
      key: "Escape",
      code: "Escape",
    });
    expect(close).not.toHaveBeenCalled();
    expect(confirm).not.toHaveBeenCalled();
  });
});
