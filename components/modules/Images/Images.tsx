"use client";

import { useImage } from "@/context/ImageContext";
import Image from "next/image";

const Images = () => {
  const { allSavedImages } = useImage();

  console.log("allSavedImages: ", allSavedImages);
  return (
    <section className="w-full flex justify-left flex-wrap">
      {allSavedImages.map((image) => (
        <div className="p-4 max-w-sm" key={image.id}>
          <div className="flex rounded-lg h-full border border-slate flex-col hover:shadow-xl">
            <Image
              alt={image.image.alt}
              src={image.image.landscape}
              width={400}
              height={400}
              className="rounded-t-lg"
              // onLoad={photoLoadingStatusHandler}
            />
            <p className="leading-relaxed text-xs px-1 text-gray">
              {`${image.image.alt} - ${image.topic}`}
            </p>
            <h2 className="text-primary text-lg font-medium py-2 px-4">{`${image.name} ${image.surname}`}</h2>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Images;
