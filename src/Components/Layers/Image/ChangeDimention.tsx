import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../Components/Ui/Select";
import { taskImages } from "../../../Types/Types";

interface ImageProps {
  value: taskImages;
  setEditing: React.Dispatch<React.SetStateAction<taskImages[]>>;
  index: number;
}
export function ChangeDimension({
  value,
  setEditing,
  index,
}: ImageProps) {
  const [dimension, setDimension] = useState(value.dimension);

  const handleDimensionChange = (index: number, newDimension: string) => {
    setEditing((prevImages) =>
      prevImages.map((img, i) =>
        i === index ? { ...img, dimension: newDimension } : img
      )
    );
  };

  return (
    <div>
      <Select
        onValueChange={(dimension) => handleDimensionChange(index, dimension)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="dimension" defaultValue={dimension} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1x1">
            <span className="bg-indigo-200 rounded-md px-1 border-indigo-400 border">
              1x1
            </span>
          </SelectItem>
          <SelectItem value="9x16">
            <span className="bg-red-200 rounded-md px-1 border-red-400 border">
              9x16
            </span>
          </SelectItem>
          <SelectItem value="16x9">
            <span className="bg-yellow-200 rounded-md px-1 border-yellow-400 border">
              16x9
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default ChangeDimension;
