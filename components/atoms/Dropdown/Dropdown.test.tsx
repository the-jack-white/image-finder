import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "./Dropdown";

const defaultProps = {
  options: [
    { value: "option1", name: "Option 1" },
    { value: "option2", name: "Option 2" },
    { value: "option3", name: "Option 3" },
  ],
  value: "option2",
  infoOption: "select an option",
  callback: jest.fn(),
};

describe("Dropdown component", () => {
  it("renders correctly with options and value", () => {
    render(<Dropdown {...defaultProps} />);

    const dropdownSelect = screen.getByTestId("dropdown-select");

    expect(dropdownSelect).toBeInTheDocument();
    expect(dropdownSelect).toHaveValue(defaultProps.value);

    const infoOptionElement = screen.getByText(defaultProps.infoOption);
    expect(infoOptionElement).toBeInTheDocument();
    expect(infoOptionElement).toHaveAttribute("disabled");

    defaultProps.options.forEach(({ value, name }) => {
      const optionElement = screen.getByText(name);
      expect(optionElement).toBeInTheDocument();
      expect(optionElement).toHaveValue(value);
    });
  });

  it("calls the callback function on change", () => {
    render(<Dropdown {...defaultProps} />);

    const dropdownSelect = screen.getByTestId("dropdown-select");
    fireEvent.change(dropdownSelect, { target: { value: "option1" } });
    expect(defaultProps.callback).toHaveBeenCalledWith("option1");
  });
});
