"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

import { generateRandomNumber, getRandomImage } from "@/utils/utils";
import { DropdownOptions, FormProps, Photo } from "@/types/types";
import { Button, Dropdown, Input } from "@/components";
import { useImage } from "@/context/ImageContext";

const Form = ({ modalCallback }: FormProps) => {
  const { addImage } = useImage();

  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [topic, setTopic] = useState<string | null>(null);
  const [otherSelected, setOtherSelected] = useState<boolean>(false);
  const [photoArray, setPhotoArray] = useState<Photo[]>([]);
  const [startImageSearch, setStartImageSearch] = useState<boolean>(false);
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
      setPhotoArray([randomImageObj]);
      setStartImageSearch(false);
    }
  };

  const onDropdownChange = (selectedTopic: string) => {
    setPhotoArray([]); // Reset photoArray so when a user change topic whilst a photo is shown, you don't see multiple photos
    if (selectedTopic !== "other") {
      setOtherSelected(false);
      setTopic(selectedTopic);
    } else {
      setOtherSelected(true);
    }
  };

  const rejectImageHandler = () => {
    setStartImageSearch(true);
    setPhotoArray([]);
    setImageLoaded(false);
    getImageHandler();
  };

  const acceptImageHandler = () => {
    if (name && surname && topic) {
      const savedImage = {
        id: `${name}_${surname}_${generateRandomNumber()}`,
        name,
        surname,
        topic,
        image: photoArray[0],
      };

      addImage(savedImage);
      setName(null);
      setSurname(null);
      setTopic(null);
      setPhotoArray([]);
      setImageLoaded(false);
      setStartImageSearch(false);
      modalCallback(false);
    } else {
      alert("Please enter a First Name and Surname to continue");
    }
  };

  useEffect(() => {
    if (topic) {
      setStartImageSearch(true);
      const timer = setTimeout(() => {
        getImageHandler();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [topic]);

  return (
    <div className="px-4 md:px-8">
      <div className="flex flex-col gap-2">
        <Input
          placeholder="First Name"
          value={name ? name : ""}
          callback={setName}
        />
        <Input
          placeholder="Surname"
          value={surname ? surname : ""}
          callback={setSurname}
        />
        <Dropdown
          infoOption="Select your preferred topic"
          options={dropdownOptions}
          value={topic ? topic : "default"}
          callback={onDropdownChange}
        />

        {otherSelected && (
          <Input
            placeholder="Please specify other topic"
            value={topic ? topic : ""}
            callback={setTopic}
          />
        )}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {startImageSearch && (
          <div className="h-[400px] flex justify-center items-center">
            <ClipLoader
              loading={true}
              color="#E10A93"
              size={80}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {photoArray.map((photo) => (
          <div
            key={photo.id}
            className="w-full flex flex-col items-center justify-center rounded"
          >
            <Image
              alt={photo.alt}
              src={photo.portrait}
              width={280}
              height={300}
              className="rounded"
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        ))}

        {imageLoaded && (
          <div className="flex justify-between">
            <Button title="Reject" callback={rejectImageHandler} isSecondary />
            <Button title="Accept" callback={acceptImageHandler} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
