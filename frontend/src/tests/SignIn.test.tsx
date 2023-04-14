import React from "react";
import renderer from "react-test-renderer";

import Root from "../routes/App";
import { BrowserRouter, RouterProvider, createMemoryRouter } from "react-router-dom";
import { routes } from "../routes/routes";

import { fireEvent, render, screen } from "@testing-library/react";

import SignIn from "../routes/account/SignIn";

it("should load when the sign in button is clicked", async () => {
  const tree = render(<RouterProvider router={createMemoryRouter(routes)} />);

  fireEvent.click(screen.getByText("Sign In"));
  expect(
    await screen.queryByText(
      "To buy and sell on our platform, you'll need to login."
    )
  ).toBeDefined();
});

it("should render the create account button", () => {
  render(<SignIn />, { wrapper: BrowserRouter });
  expect(screen.getByText("Create one.")).toBeVisible();
});

it("should render the submit button", () => {
  render(<SignIn />, { wrapper: BrowserRouter });
  expect(screen.getByText("Submit")).toBeVisible();
});

it("should render the forgot password button", () => {
  render(<SignIn />, { wrapper: BrowserRouter });
  expect(screen.getByText("password?")).toBeVisible();
});





