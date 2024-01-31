import {
  generateRandomNumber,
  getRandomImage,
  saveToLocalStorage,
  retrieveLocalStorage,
} from "./utils";

const mockImage = [
  {
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
];

describe("generateRandomNumber", () => {
  it("generates a random number between 1 and 80", () => {
    const randomNumber = generateRandomNumber();
    expect(randomNumber).toBeGreaterThan(1);
    expect(randomNumber).toBeLessThan(80);
  });
});

describe("getRandomImage", () => {
  it("get a random image", async () => {
    const randomImage = await getRandomImage("test");
    expect(randomImage).resolves;
  });
});

describe("saveToLocalStorage", () => {
  it("saves image to localStorage", () => {
    const storageId = "testImage";

    saveToLocalStorage(storageId, mockImage);

    const savedImage = JSON.parse(localStorage.getItem(storageId) || "[]");
    expect(savedImage).toEqual(mockImage);
  });
});

describe("retrieveLocalStorage", () => {
  it("retrieves tasks from localStorage", () => {
    const storageId = "testImage";
    localStorage.setItem(storageId, JSON.stringify(mockImage));

    const savedImage = retrieveLocalStorage(storageId);
    expect(savedImage).toEqual(mockImage);
  });

  it("returns empty array if storageId not found for images", () => {
    const storageId = "nonexistentImage";
    const savedImage = retrieveLocalStorage(storageId);
    expect(savedImage).toEqual([]);
  });
});
