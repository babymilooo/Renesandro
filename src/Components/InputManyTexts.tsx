import { Cross2Icon } from "@radix-ui/react-icons";
import { Input } from "./Ui/Input";
import { useState } from "react";
export function InputManyTexts({
  setTextArray,
  textArray,
}: {
  setTextArray: Function;
  textArray: string[];
}) {
  const [text, setText] = useState("");

  return (
    <div className="col-span-3 border rounded-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 flex-wrap">
          {textArray.map((text, index) => (
            <div className="flex gap-2 items-center bg-gray-200 px-1 rounded-md border-gray-400 border">
              <span>{text}</span>
              <Cross2Icon
                className="w-4 h-4 cursor-pointer"
                onClick={() =>
                  setTextArray(textArray.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="type text"
            className="col-span-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="rounded-lg px-2 py-1 cursor-pointer bg-neutral-900 text-white text-lg font-semibold w-[100px]"
            onClick={() => {
              setTextArray([...textArray, text]);
              setText("");
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
