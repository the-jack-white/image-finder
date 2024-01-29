"use client";

import { ImageContextType, SavedImage } from "@/types/types";
import { ReactNode, createContext, useContext, useState } from "react";

const imageContextDefaultValues: ImageContextType = {
  allSavedImages: [],
  setAllSavedImages: () => {},
  addImage: () => {},
  removeImage: () => {},
  editImage: () => {},
};

const ImageContext = createContext<ImageContextType>(imageContextDefaultValues);

export const useImage = () => {
  return useContext(ImageContext);
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [allSavedImages, setAllSavedImages] = useState<SavedImage[]>([]);

  const addImage = (image: SavedImage) => {
    setAllSavedImages((prev) => [...prev, image]);
  };

  const removeImage = (id: string) => {
    const filtered = allSavedImages.filter((image) => image.id !== id);
    setAllSavedImages(filtered);
  };

  const editImage = (image: SavedImage, id: string) => {
    const mappedTasks = allSavedImages.map((obj) => {
      if (obj.id === id) {
        return image;
      } else {
        return obj;
      }
    });

    setAllSavedImages(mappedTasks);
  };

  const value = {
    allSavedImages,
    setAllSavedImages,
    addImage,
    removeImage,
    editImage,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
