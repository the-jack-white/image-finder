import { fireEvent, render, screen } from "@testing-library/react";
import { InputProps } from "@/types/types";
import Input from "./Input";

describe("Input Component", () => {
  const defaultProps: InputProps = {
    placeholder: "placeholder",
    value: "value",
    callback: jest.fn(),
  };

  it("renders the Input component", () => {
    render(<Input {...defaultProps} />);

    const inputElement = screen.getByTestId("main-input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("value");
  });

  it("calls the callback function with the correct value when input changes", async () => {
    render(<Input {...defaultProps} />);
    const inputElement = screen.getByTestId("main-input");

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(defaultProps.callback).toHaveBeenCalledWith("test");
  });
});
