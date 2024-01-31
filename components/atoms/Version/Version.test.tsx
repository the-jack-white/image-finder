import { render, screen } from "@testing-library/react";
import Version from "./Version";

jest.mock("../../../package.json", () => ({
  version: "1.0.0",
}));

describe("Version component", () => {
  it("renders the version correctly", () => {
    render(<Version />);

    const appVersion = screen.getByTestId("app-version");

    expect(appVersion).toBeInTheDocument();
    expect(appVersion).toHaveTextContent("v1.0.0");
  });
});
