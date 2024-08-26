import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTaskContext } from "./Store/Hooks/useTaskContext";

import { Task, taskImages } from "./Types/Types";
import ChangeDimention from "./Components/Layers/Image/ChangeDimention";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Components/Ui/Accordion";
import ChangeFlow from "./Components/Layers/Image/ChangeFlow";
import ImageRefs from "./Components/Layers/Image/ImageRefs";
import InputMutualPrompts from "./Components/Layers/Image/InputMutualPrompts";
import SelectStyles from "./Components/Layers/Image/SelectStyles";
import InputGenPerRef from "./Components/Layers/Image/InputGenPerRef";
import toast, { Toaster } from "react-hot-toast";

const TaskComponent = () => {
  const { id } = useParams();
  const { findTask } = useTaskContext();

  const [task, setTask] = useState<Task | undefined>(undefined);
  const [editingImages, setEditingImages] = useState<taskImages[]>([]);
  useEffect(() => {
    const task = findTask(id as string);
    if (task) {
      setTask(task);

      const newTaskImages = task.image_layers.map((image: string) => ({
        assigned_task_name: task.task_name,
        layer_name: image,
        images: [],
        dimension: "",
        style: "",
        manual_prompts: "",
        gen_per_ref: 0,
        flow: "",
      }));

      setEditingImages(newTaskImages);
    }
  }, []);

  const handleGenerate = async (index: number) => {
    const taskImage = editingImages[index];
    console.log(
      "Generating image: ",

      "task name: ",
      taskImage.assigned_task_name,

      "layer name: ",
      taskImage.layer_name,
      "dimention:",
      taskImage.dimension,
      "style:",
      taskImage.style,
      "manual prompts:",
      taskImage.manual_prompts,
      "gen per ref:",
      taskImage.gen_per_ref,
      "flow:",
      taskImage.flow
    );

    try {
      const response = await fetch(
        "https://tz-front-jvqis72guq-lm.a.run.app/tz-front/generate_images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic cmVuZXNhbmRybzpxd2VydHkxMjM0",
          },
          body: JSON.stringify(taskImage),
        }
      );
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="flex w-full h-full justify-center">
        <div className="flex flex-col w-1/3 mt-[200px]">
          <span className="text-start w-full font-bold text-5xl">
            {task?.task_name}
          </span>
          <span className="text-start text-neutral-500 mb-5">
            Change task's parameters
          </span>
          <div className="mb-10">
            {editingImages?.map((image, index) => (
              <Accordion type="single" collapsible key={index}>
                <AccordionItem value={image.layer_name}>
                  <AccordionTrigger>
                    <span className="text-lg font-bold">
                      {image.layer_name}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className=" flex flex-col gap-4">
                    <ChangeDimention
                      image={image}
                      setEditingImages={setEditingImages}
                      index={index}
                    />
                    <ChangeFlow
                      setEditingImages={setEditingImages}
                      index={index}
                    />
                    <div className=" inline-block border-b"></div>
                    <ImageRefs
                      setEditingImages={setEditingImages}
                      index={index}
                      imageRefs={image.images}
                    />
                    <InputMutualPrompts
                      image={image}
                      setEditingImages={setEditingImages}
                      index={index}
                    />
                    <InputGenPerRef
                      image={image}
                      setEditingImages={setEditingImages}
                      index={index}
                    />
                    <SelectStyles
                      image={image}
                      setEditingImages={setEditingImages}
                      index={index}
                    />
                    <button
                      className="bg-neutral-900 text-white rounded-md p-2"
                      onClick={() => handleGenerate(index)}
                    >
                      Generate
                    </button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />

    </div>
  );
};

export default TaskComponent;
