import { useState } from "react";
import { taskImages } from "../../../Types/Types";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ImageProps {
  setEditingImages: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
  imageRefs: string[];
}

const ImageRefs = ({ setEditingImages, index, imageRefs }: ImageProps) => {
  const [dragActive, setDragActive] = useState(false);

  const handleFilesUpload = (files: FileList) => {
    const newRefs = Array.from(files).map((file) => URL.createObjectURL(file));
    setEditingImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, images: [...img.images, ...newRefs] } : img
      )
    );
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDragActive(false);
    if (event.dataTransfer.files) {
      handleFilesUpload(event.dataTransfer.files);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFilesUpload(event.target.files);
    }
  };

  const handleRemoveImage = (
    ref: string,
    event: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    event.preventDefault();
    setEditingImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index
          ? { ...img, images: img.images.filter((image) => image !== ref) }
          : img
      )
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-sm font-bold">Image refs</span>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleInputChange}
        className="hidden"
        id={`file-upload-${index}`}
      />
      <label
        htmlFor={`file-upload-${index}`}
        className={`w-full min-h-[150px] bg-neutral-200 rounded-md border border-dashed border-neutral-400 flex justify-center items-center cursor-pointer ${
          dragActive ? "bg-neutral-300" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {imageRefs.length ? (
          <div className="flex gap-2 flex-wrap p-2">
            {imageRefs.map((ref, index) => (
              <div className=" relative group" key={index}>
                <img
                  key={index}
                  src={ref}
                  alt={`Uploaded ${index}`}
                  className="h-[100px] w-[100px] object-cover rounded-md border border-neutral-400"
                />
                <Cross2Icon
                  className="absolute top-1 right-1 bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(event) => handleRemoveImage(ref, event)}
                  width={20}
                  height={20}
                />
              </div>
            ))}
          </div>
        ) : (
          <span className="text-neutral-500">Click or drag files here.</span>
        )}
      </label>
    </div>
  );
};

export default ImageRefs;
