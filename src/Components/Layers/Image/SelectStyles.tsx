import React from "react";
import { taskImages } from "../../../Types/Types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/Ui/Select";

interface ImageProps {
  image: taskImages;
  setEditingImages: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
}

const SelectStyles = ({ image, setEditingImages, index }: ImageProps) => {
  const handleChange = (index: number, newStyle: string) => {
    setEditingImages((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, style: newStyle } : img
      )
    );
  };

  return (
    <Select onValueChange={(value) => handleChange(index, value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Style" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="An ultra-realistic photography">
          <span className="bg-indigo-200 rounded-md px-1 border-indigo-400 border">
            An ultra-realistic photography
          </span>
        </SelectItem>
        <SelectItem value="Anime style">
          <span className="bg-red-200 rounded-md px-1 border-red-400 border">
            Anime style
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SelectStyles;
