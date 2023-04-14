import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Menu from "../components/menu/Menu";

it("should render the Menu component", () => {
  const wrapper = render(<Menu />, { wrapper: BrowserRouter });
  expect(wrapper).toBeTruthy();

  const navbar = wrapper.container.querySelector("nav");
  expect(navbar).toBeVisible();
  //   expect(screen.getByText("Sign In")).toBeVisible();
});

it("should render the search input", () => {
  render(<Menu />, { wrapper: BrowserRouter });
  const wrapper = render(<Menu />, { wrapper: BrowserRouter });
  const navbar = wrapper.container.querySelector("nav");
  expect(navbar?.querySelector("input")).toBeVisible();
});

it("should render the login button", () => {
  render(<Menu />, { wrapper: BrowserRouter });
  expect(screen.getByText("Sign In")).toBeVisible();
});


it("should render the browse button", () => {
  render(<Menu />, { wrapper: BrowserRouter });
  expect(screen.getByText("Browse")).toBeVisible();
});

it("should render the home button", () => {
  render(<Menu />, { wrapper: BrowserRouter });
  expect(screen.getByText("E-Commerce")).toBeVisible();
});