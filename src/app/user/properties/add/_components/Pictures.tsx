import FileInput from "@/app/Components/fileUpload";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { Button, Card, cn } from "@nextui-org/react";
import React from "react";
import PictureCard from "./PictureCard";
import { PropertyImage } from "@prisma/client";

interface props {
  next: () => void;
  prev: () => void;
  className?: string;
  images: File[];
  setImages: (images: File[]) => void;
  savedImagesUrl?: PropertyImage[];
  setSavedImagesUrl?: (PropertyImage: PropertyImage[]) => void;
}

const Pictures = ({
  next,
  prev,
  className,
  setImages,
  images,
  savedImagesUrl,
  setSavedImagesUrl,
}: props) => {
  const handlePrev = () => prev();
  const handleNext = () => next();

  return (
    <Card className={cn(className)}>
      <FileInput
        onSelect={(e) => setImages([(e as any).target.files[0], ...images])}
      />
      <div className="flex fap-3 flex-wrap">
        {savedImagesUrl!! &&
          setSavedImagesUrl!! &&
          savedImagesUrl.map((image, index) => {
            return (
              <PictureCard
                index={index}
                onDelete={(i) =>
                  setSavedImagesUrl!! &&
                  setSavedImagesUrl(
                    savedImagesUrl?.filter((img) => img.id !== image.id)
                  )
                }
                src={image.url}
                key={image.id}
              />
            );
          })}
        {images.map((image, index) => {
          const srcUrl = URL.createObjectURL(image);
          return (
            <PictureCard
              index={index}
              onDelete={(i) =>
                setImages([...images.slice(0, i), ...images.slice(i + 1)])
              }
              src={srcUrl}
              key={srcUrl}
            />
          );
        })}
      </div>
      <div className="flex justify-center col-span-2 gap-3 mt-3">
        <Button
          onClick={handlePrev}
          startContent={<ChevronLeftIcon className="w-6" />}
          className="w-36"
          color="primary"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          endContent={<ChevronRightIcon className="w-6" />}
          className="w-36"
          color="primary"
        >
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Pictures;
