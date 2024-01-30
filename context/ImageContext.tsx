"use client";

import { ReactNode, createContext, useContext, useState } from "react";
import { ImageContextType, SavedImage } from "@/types/types";
import { saveToLocalStorage } from "@/utils/utils";

const imageContextDefaultValues: ImageContextType = {
  allSavedImages: [],
  setAllSavedImages: () => {},
  addImage: () => {},
  getImage: () => {
    return {} as SavedImage;
  },
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
    setAllSavedImages((prev) => {
      const newImageState = [...prev, image];
      saveToLocalStorage("images", newImageState);

      return newImageState;
    });
  };

  const getImage = (id: string) => {
    const filtered = allSavedImages.filter((image) => image.id === id);

    return filtered[0];
  };

  const removeImage = (id: string) => {
    const filtered = allSavedImages.filter((image) => image.id !== id);
    saveToLocalStorage("images", filtered);
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
    getImage,
    removeImage,
    editImage,
  };

  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
