import { render, screen, fireEvent } from "@testing-library/react";
import { useImage, ImageProvider } from "./ImageContext";

jest.mock("../utils/utils", () => ({
  saveToLocalStorage: jest.fn(),
}));

const mockImageObj = {
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
};

const mockImage = [mockImageObj];

describe("ImageProvider Component", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders children and provides the correct context values", () => {
    render(
      <ImageProvider>
        <TestComponent />
      </ImageProvider>
    );

    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("0");

    fireEvent.click(screen.getByText("Add Image"));
    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("1");

    expect(require("../utils/utils").saveToLocalStorage).toHaveBeenCalledWith(
      "images",
      mockImage
    );
  });

  it("removes an image and updates the context and localStorage", () => {
    render(
      <ImageProvider>
        <TestComponent />
      </ImageProvider>
    );

    fireEvent.click(screen.getByText("Add Image"));

    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("Remove Image"));

    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("0");

    expect(require("../utils/utils").saveToLocalStorage).toHaveBeenCalledWith(
      "images",
      []
    );
  });

  it("gets an image", () => {
    render(
      <ImageProvider>
        <TestComponent />
      </ImageProvider>
    );

    fireEvent.click(screen.getByText("Add Image"));

    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("1");

    const retrievedImageElement = screen.getByTestId("retrieved-image");

    expect(retrievedImageElement).toBeInTheDocument();
    expect(retrievedImageElement).toHaveTextContent(
      JSON.stringify(mockImageObj)
    );
  });

  it("removes an image and updates the context and localStorage", () => {
    render(
      <ImageProvider>
        <TestComponent />
      </ImageProvider>
    );

    fireEvent.click(screen.getByText("Add Image"));

    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("1");

    fireEvent.click(screen.getByText("Remove Image"));

    expect(screen.getByTestId("savedImage-count")).toHaveTextContent("0");

    expect(require("../utils/utils").saveToLocalStorage).toHaveBeenCalledWith(
      "images",
      []
    );
  });
});

const TestComponent = () => {
  const { allSavedImages, addImage, getImage, removeImage } = useImage();

  const retrievedImage = getImage("saved-image-id");

  return (
    <div>
      <span data-testid="savedImage-count">{allSavedImages.length}</span>
      <button onClick={() => addImage(mockImageObj)}>Add Image</button>
      <button onClick={() => removeImage("saved-image-id")}>
        Remove Image
      </button>
      <div data-testid="retrieved-image">{JSON.stringify(retrievedImage)}</div>
    </div>
  );
};
