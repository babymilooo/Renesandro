import { InputManyImages } from "./InputManyImages";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../Components/Ui/Dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../Components/Ui/Select";

import { Input } from "./Ui/Input";
import { InputManyTexts } from "./InputManyTexts";
import { DialogClose } from "@radix-ui/react-dialog";
import { useTaskContext } from "../Store/Hooks/useTaskContext";
import { Task } from "../Types/Types";

const CreateNewTask = () => {
  const [imgArray, setImgArray] = useState<string[]>([]);
  const [textArray, setTextArray] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [dimention, setDimention] = useState("");
  const [templateID, setTemplateID] = useState("");
  const [amount, setAmount] = useState<number>(0);
  const [genType, setGenType] = useState("");
  const { addTask } = useTaskContext();

  const handleCreate = async () => {
    const newTask: Task = {
      id: "",
      task_name: name,
      dimension: dimention,
      template_id: templateID,
      image_layers: imgArray,
      text_layers: textArray,
      amount: amount,
      gen_type: genType,
    };

    if (!name || !dimention || !templateID || amount === 0 || !genType) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        "https://tz-front-jvqis72guq-lm.a.run.app/tz-front/generate_formats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic cmVuZXNhbmRybzpxd2VydHkxMjM0",
          },
          body: JSON.stringify(newTask),
        }
      );
      const data = await response.json();
      toast.success(data.message);
      addTask(newTask);
    } catch (error) {
      console.log(error);
    }

    setName("");
    setDimention("");
    setTemplateID("");
    setImgArray([]);
    setTextArray([]);
    setAmount(0);
    setGenType("");
  };

  return (
    <>
      <Dialog>
        <DialogTrigger>Create new</DialogTrigger>
        <DialogContent className="w-[600px]">
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
            <DialogDescription>
              Fill in the form below to create a new task.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-y-4 w-full">
            <Input
              type="text"
              placeholder="Task name"
              className="col-span-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Select onValueChange={setDimention}>
              <SelectTrigger className="w-full col-span-2">
                <SelectValue placeholder="Dimention" />
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
                <SelectItem value="system">
                  <span className="bg-yellow-200 rounded-md px-1 border-yellow-400 border">
                    16x9
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setTemplateID}>
              <SelectTrigger className="w-full col-span-2">
                <SelectValue placeholder="Template ID" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mwpswxcudtwxb">
                  <span className=" bg-lime-200 rounded-md px-1 border-lime-400 border">
                    mwpswxcudtwxb
                  </span>
                </SelectItem>
                <SelectItem value="0xdoscyowl50c">
                  <span className=" bg-sky-200 rounded-md px-1 border-sky-400 border">
                    0xdoscyowl50c
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <InputManyImages setImgArray={setImgArray} imgArray={imgArray} />

            <InputManyTexts setTextArray={setTextArray} textArray={textArray} />

            <Input
              type="number"
              placeholder="Amount"
              className="col-span-2"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />

            <Select onValueChange={setGenType}>
              <SelectTrigger className="w-full col-span-2">
                <SelectValue placeholder="Gen type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cyclic_generation">
                  <span className=" bg-orange-200 rounded-md px-1 border-orange-400 border">
                    cyclic_generation
                  </span>
                </SelectItem>
                <SelectItem value="random_generation">
                  <span className=" bg-cyan-200 rounded-md px-1 border-cyan-400 border">
                    random_generation
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="">
            <DialogClose asChild>
              <button
                className="rounded-lg px-3 py-2 cursor-pointer bg-neutral-900 text-white text-lg font-semibold w-[200px]"
                onClick={handleCreate}
              >
                Create
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Toaster position="bottom-center" />
    </>
  );
};

export default CreateNewTask;
