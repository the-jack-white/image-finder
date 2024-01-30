"use client";

import { useEffect, useState } from "react";
import { useImage } from "@/context/ImageContext";
import { retrieveLocalStorage } from "@/utils/utils";
import { Card, Modal } from "@/components";
import { SavedImage } from "@/types/types";
import Image from "next/image";

const Images = () => {
  const { allSavedImages, setAllSavedImages, getImage } = useImage();
  const [openImagePreview, setOpenImagePreview] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [preview, setPreview] = useState<SavedImage>();

  const getImageHandler = (id: string) => {
    setPreview(getImage(id));
    setOpenImagePreview(true);
  };

  useEffect(() => {
    // See if there are any saved images in LocalStorage first
    setAllSavedImages(retrieveLocalStorage("images"));
  }, []);

  return (
    <section className="w-full bg-slate flex flex-wrap justify-center sm:justify-left">
      {allSavedImages.map((image) => (
        <Card key={image.id} image={image} callback={getImageHandler} />
      ))}
      <Modal
        heading="Image Preview"
        show={openImagePreview}
        callback={setOpenImagePreview}
      >
        {preview ? (
          <div>
            <Image
              alt={preview.image.alt}
              src={preview.image.original}
              width={400}
              height={300}
              className="w-full rounded"
              onLoad={() => setImageLoaded(true)}
            />
            <span className="text-gray text-xs">{preview.id}</span>
          </div>
        ) : (
          ""
        )}
      </Modal>
    </section>
  );
};

export default Images;
