/**
 * @jest-environment jsdom
 */
import Home from "./Home";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

it("renders the home component", () => {
  render(<Home />);
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeInTheDocument();
});
