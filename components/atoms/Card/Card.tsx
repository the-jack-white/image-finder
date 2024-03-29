import Image from "next/image";
import { useImage } from "@/context/ImageContext";
import { CardProps } from "@/types/types";

const Card = ({ image, callback }: CardProps) => {
  const { removeImage } = useImage();

  return (
    <div className="p-4 max-w-sm">
      <div
        className="flex rounded-lg h-full bg-secondary flex-col hover:shadow-xl"
        data-testid="main-card"
      >
        <Image
          alt={image.image.alt}
          src={image.image.landscape}
          width={400}
          height={400}
          className="rounded-t-lg"
          onClick={() => callback(image.id)}
          data-testid="card-image"
        />
        <p
          className="leading-relaxed text-xs px-1 text-gray"
          data-testid="card-image-desc"
        >
          {`${image.image.alt} - ${image.topic}`}
        </p>
        <div className="flex justify-between py-2 px-4">
          <h2
            className="text-primary text-lg font-medium"
            data-testid="card-heading"
          >{`${image.name} ${image.surname}`}</h2>
          <a
            className="bi bi-trash3 text-xl cursor-pointer"
            onClick={() => removeImage(image.id)}
            data-testid="card-remove-button"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
