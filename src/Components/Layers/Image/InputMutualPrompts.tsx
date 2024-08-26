import React from "react";
import { taskImages } from "../../../Types/Types";
import { Input } from "../../Ui/Input";

interface ImageProps {
  image: taskImages;
  setEditingImages: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
}

const InputMutualPromts = ({ image, setEditingImages, index }: ImageProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, manual_prompts: event.target.value } : img
      )
    );
  };

  return (
    <Input
      type="text"
      placeholder="Mutual prompts"
      value={image.manual_prompts}
      onChange={(event) => handleChange(event)}
    />
  );
};

export default InputMutualPromts;
