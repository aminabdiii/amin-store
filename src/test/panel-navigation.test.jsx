import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserPanelAsideItem from "../ui/UserPanelAsideItem";
import UserPanelAsideMobileItem from "../ui/UserPanelAsideMobileItem";

describe("panel navigation", () => {
  it.each([UserPanelAsideItem, UserPanelAsideMobileItem])(
    "marks the current route without a page prop",
    (Item) => {
      render(
        <MemoryRouter
          initialEntries={["/userPanel/purchases?sort=new"]}
          future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
        >
          <ul>
            <Item path="purchases">Purchases</Item>
            <Item path="users" type="admin">
              Users
            </Item>
          </ul>
        </MemoryRouter>,
      );
      expect(screen.getByRole("link", { name: "Purchases" })).toHaveAttribute(
        "aria-current",
        "page",
      );
      expect(screen.getByRole("link", { name: "Users" })).not.toHaveAttribute(
        "aria-current",
      );
    },
  );
});
