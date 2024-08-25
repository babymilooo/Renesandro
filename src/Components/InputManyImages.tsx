import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "./Ui/Input";
import { useState } from "react";
export function InputManyImages({
  setImgArray,
  imgArray,
}: {
  setImgArray: Function;
  imgArray: string[];
}) {
  const [image, setImages] = useState("");

  return (
    <div className="col-span-3 border rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {imgArray.map((image, index) => (
            <div className="flex gap-2 items-center bg-gray-200 px-1 rounded-md border-gray-400 border">
              <span>{image}</span>
              <Cross2Icon
                className="w-4 h-4 cursor-pointer"
                onClick={() =>
                  setImgArray(imgArray.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="type image template"
            className="col-span-1"
            value={image}
            onChange={(e) => setImages(e.target.value)}
          />
          <button
            className="rounded-lg px-2 py-1 cursor-pointer bg-neutral-900 text-white text-lg font-semibold w-[100px]"
            onClick={() => {
              setImgArray([...imgArray, image]);
              setImages("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
