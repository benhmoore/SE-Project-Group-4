import React from "react";
import renderer from "react-test-renderer";

import Root from "../routes/App";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../routes/routes";

import { fireEvent, render, screen } from "@testing-library/react";

it("should load when the sign in button is clicked", async () => {
  const tree = render(<RouterProvider router={createMemoryRouter(routes)} />);

  fireEvent.click(screen.getByText("Sign In"));
  expect(
    await screen.queryByText(
      "To buy and sell on our platform, you'll need to login."
    )
  ).toBeDefined();
});
