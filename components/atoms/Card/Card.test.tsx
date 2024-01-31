import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

const defaultProps = {
  image: {
    id: "saved-image-id",
    name: "John",
    surname: "Doe",
    topic: "Sample Topic",
    image: {
      id: 1,
      alt: "Sample Alt",
      landscape: "/sample-image-land.jpg",
      portrait: "/sample-image-port.jpg",
      original: "/sample-image-org.jpg",
      height: 300,
      width: 300,
    },
  },
  callback: jest.fn(),
};

describe("Card Component", () => {
  it("renders correctly", () => {
    render(<Card {...defaultProps} />);

    const mainCard = screen.getByTestId("main-card");
    const cardImage = screen.getByTestId("card-image");
    const cardImageDesc = screen.getByTestId("card-image-desc");
    const cardHeading = screen.getByTestId("card-heading");
    const cardRemoveButton = screen.getByTestId("card-remove-button");

    expect(mainCard).toBeInTheDocument();
    expect(cardImage).toBeInTheDocument();
    expect(cardImageDesc).toBeInTheDocument();
    expect(cardHeading).toBeInTheDocument();
    expect(cardRemoveButton).toBeInTheDocument();
  });

  it("calls the callback correctly", () => {
    render(<Card {...defaultProps} />);

    const cardImage = screen.getByTestId("card-image");
    fireEvent.click(cardImage);
    expect(defaultProps.callback).toHaveBeenCalledWith(defaultProps.image.id);
  });
});
