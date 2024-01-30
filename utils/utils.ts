import { SavedImage } from "@/types/types";
import { createClient } from "pexels";

const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY as string);

export const generateRandomNumber = () => {
  return Math.ceil(Math.random() * 80);
};

export const getRandomImage = (topic: string) => {
  return new Promise((resolve, reject) => {
    client.photos
      .search({ query: topic, page: generateRandomNumber(), per_page: 1 })
      .then((photos: any) => {
        const { id, alt, src, height, width } = photos.photos[0];

        resolve({
          id,
          alt,
          portrait: src.portrait,
          landscape: src.landscape,
          height,
          width,
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const saveToLocalStorage = (
  storageId: string,
  images: SavedImage[] | null
) => {
  localStorage.setItem(storageId, JSON.stringify(images));
};

export const retrieveLocalStorage = (storageId: string) => {
  const jsonString = localStorage.getItem(storageId);

  return jsonString ? JSON.parse(jsonString) : [];
};
