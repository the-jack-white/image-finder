import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button Component", () => {
  const mockCallback = jest.fn();

  const defaultProps = {
    title: "Submit",
    callback: mockCallback,
  };

  const isSecondaryProps = {
    ...defaultProps,
    isSecondary: true,
  };

  it("renders the button", () => {
    render(<Button {...defaultProps} />);

    const addButton = screen.getByTestId("main-button");
    expect(addButton).toHaveTextContent("Submit");
  });

  it("has the correct class", () => {
    render(<Button {...defaultProps} />);

    const addButton = screen.getByTestId("main-button");
    expect(addButton).toHaveClass(
      "py-1 px-2 rounded hover:shadow bg-primary text-secondary hover:bg-secondary hover:text-primary"
    );
  });

  it("has the correct class", () => {
    render(<Button {...isSecondaryProps} />);

    const addButton = screen.getByTestId("main-button");
    expect(addButton).toHaveClass(
      "py-1 px-2 rounded hover:shadow bg-slate text-gray hover:text-secondary"
    );
  });

  it("calls the callback function when clicked", () => {
    render(<Button {...defaultProps} />);

    const addButton = screen.getByTestId("main-button");

    fireEvent.click(addButton);

    expect(mockCallback).toHaveBeenCalled();
  });
});
