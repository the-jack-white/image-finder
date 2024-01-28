"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { getRandomImage } from "@/utils/utils";
import { DropdownOptions, Photo } from "@/types/types";
import { Dropdown, Input } from "@/components";

const Form = () => {
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);

  const [otherSelected, setOtherSelected] = useState<boolean>(false);
  const [other, setOther] = useState<string | null>(null);

  const [photoArray, setPhotoArray] = useState<Photo[]>([]);

  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const dropdownOptions: DropdownOptions[] = [
    {
      value: "travel",
      name: "Travel",
    },
    {
      value: "cars",
      name: "Cars",
    },
    {
      value: "wildlife",
      name: "Wildlife",
    },
    {
      value: "technology",
      name: "Technology",
    },
    {
      value: "other",
      name: "Other",
    },
  ];

  const getImageHandler = async () => {
    if (topic) {
      const randomImageObj = (await getRandomImage(topic)) as Photo;
      console.log("RANDOM img: ", randomImageObj);
      setPhotoArray([randomImageObj]);
    }
  };

  const onDropdownChange = (selectedTopic: string) => {
    if (selectedTopic !== "other") {
      setOtherSelected(false);
      setTopic(selectedTopic);
    } else {
      setOtherSelected(true);
    }
  };

  const onOtherTopicChange = () => {};

  const rejectImageHandler = () => {
    setPhotoArray([]);
    setImageLoaded(false);
    getImageHandler();
  };

  useEffect(() => {
    getImageHandler();
  }, [topic]);

  return (
    <div className="mt-10 w-1/4">
      <div className="flex flex-col gap-2">
        <Input placeholder="First Name" callback={setName} />
        <Input placeholder="Surname" callback={setSurname} />
        <Dropdown options={dropdownOptions} callback={onDropdownChange} />

        {otherSelected && (
          <Input placeholder="Please specify other topic" callback={setOther} />
        )}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {photoArray.map((photo) => (
          <div
            key={photo.id}
            className="w-full h-[400px] flex flex-col items-center justify-center rounded"
          >
            <Image
              alt={photo.alt}
              src={photo.portrait}
              width={400}
              height={400}
              className="rounded"
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <ClipLoader
                loading={true}
                color="#E10A93"
                size={80}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            )}
          </div>
        ))}

        {imageLoaded && (
          <div className="flex justify-between">
            <button
              className="bg-slate text-gray py-1 px-2 rounded hover:text-secondary hover:shadow"
              onClick={rejectImageHandler}
            >
              Reject
            </button>
            <button
              className="bg-primary text-secondary py-1 px-2 rounded hover:bg-secondary hover:text-primary hover:shadow"
              onClick={() => console.log("Save IMAGE")}
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
