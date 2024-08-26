import React from "react";
import { Input } from "../../Ui/Input";
import { taskImages } from "../../../Types/Types";
import { Label } from "../../Ui/Label";

interface ImageProps {
  image: taskImages;
  setEditingImages: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
}

const InputGenPerRef = ({ image, setEditingImages, index }: ImageProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, gen_per_ref: Number(event.target.value) } : img
      )
    );
  };

  return (
    <>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="GenPerRef"
          className="text-neutral-500 pl-2 font-bold select-none"
        >
          Gen per ref
        </Label>
        <Input
          id="GenPerRef"
          type="number"
          min={0}
          max={20}
          placeholder="Gen per ref"
          value={image.gen_per_ref}
          onChange={(event) => handleChange(event)}
        />
      </div>
    </>
  );
};

export default InputGenPerRef;
