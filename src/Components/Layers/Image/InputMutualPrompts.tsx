import React from "react";
import { taskImages } from "../../../Types/Types";
import { Input } from "../../Ui/Input";

interface ImageProps {
  value: taskImages;
  setEditing: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
}

const InputMutualPromts = ({ value, setEditing, index }: ImageProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditing((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, manual_prompts: event.target.value } : img
      )
    );
  };

  return (
    <Input
      type="text"
      placeholder="Mutual prompts"
      value={value.manual_prompts}
      onChange={(event) => handleChange(event)}
    />
  );
};

export default InputMutualPromts;
