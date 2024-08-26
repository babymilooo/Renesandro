import { useState } from "react";
import { taskImages } from "../../../Types/Types";
import { Cross2Icon } from "@radix-ui/react-icons";

interface ImageProps {
  setEditing: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
  imageRefs: string[];
  value_type: string;
}

const toBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const ImageRefs = ({
  setEditing,
  index,
  value_type,
  imageRefs,
}: ImageProps) => {
  const [dragActive, setDragActive] = useState(false);
  const handleFilesUpload = async (files: FileList) => {
    const newRefsPromises = Array.from(files).map(async (file) => {
      const base64 = await toBase64(file);
      return base64;
    });

    const newRefs = await Promise.all(newRefsPromises);

    setEditing((prevImages) => {
      const updatedImages = prevImages.map((img, i) =>
        i === index && img.type === value_type
          ? { ...img, images: [...img.images, ...newRefs] }
          : img
      );
      return updatedImages;
    });
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
    setEditing((prevImages) =>
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
        className="hidden"
        onChange={handleInputChange}
        id={`file-upload-${index}-${value_type}`}
      />
      <label
        htmlFor={`file-upload-${index}-${value_type}`}
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
