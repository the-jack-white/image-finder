"use client";

import { useEffect } from "react";
import { useImage } from "@/context/ImageContext";
import { retrieveLocalStorage } from "@/utils/utils";
import { Card } from "@/components";

const Images = () => {
  const { allSavedImages, setAllSavedImages, removeImage } = useImage();

  useEffect(() => {
    // See if there are any saved images in LocalStorage first
    setAllSavedImages(retrieveLocalStorage("images"));
  }, []);

  return (
    <section className="w-full flex flex-wrap justify-center sm:justify-left">
      {allSavedImages.map((image) => (
        <Card key={image.id} image={image} />
      ))}
    </section>
  );
};

export default Images;
