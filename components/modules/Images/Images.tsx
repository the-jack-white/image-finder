"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { useImage } from "@/context/ImageContext";
import { retrieveLocalStorage } from "@/utils/utils";
import { Card, Modal } from "@/components";
import { SavedImage } from "@/types/types";

const Images = () => {
  const { allSavedImages, setAllSavedImages, getImage } = useImage();
  const [openImagePreview, setOpenImagePreview] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [preview, setPreview] = useState<SavedImage>();

  const getImageHandler = (id: string) => {
    setImageLoaded(true);
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
        {imageLoaded && (
          <div className="flex justify-center items-center py-6">
            <ClipLoader
              loading={true}
              color="#E10A93"
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {preview && (
          <>
            <Image
              alt={preview.image.alt}
              src={preview.image.original}
              width={400}
              height={0}
              className="w-full rounded"
              onLoad={() => setImageLoaded(false)}
            />
            <span className="text-gray text-xs">{preview.id}</span>
          </>
        )}
      </Modal>
    </section>
  );
};

export default Images;
