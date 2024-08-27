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
import { InputManyTexts } from "./Components/InputManyTexts";
import InputTextRef from "./Components/Layers/Text/InputTextRef";
import Navbar from "./Components/Navbar";

const TaskComponent = () => {
  const { id } = useParams();
  const { findTask } = useTaskContext();

  const [task, setTask] = useState<Task | undefined>(undefined);
  const [editingImages, setEditingImages] = useState<taskImages[]>([]);
  const [editingText, setEditingText] = useState<taskImages[]>([]);
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
        type: "image",
      }));

      setEditingImages(newTaskImages);

      const newTextImages = task.text_layers.map((text: string) => ({
        assigned_task_name: task.task_name,
        layer_name: text,
        images: [],
        dimension: "",
        style: "",
        manual_prompts: "",
        gen_per_ref: 0,
        flow: "",
        type: "text",
      }));

      setEditingText(newTextImages);
    }
  }, []);

  const handleGenerate = async (task: taskImages) => {
    if (task.dimension === "" || task.style === "" || task.flow === "") {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        "https://tz-front-jvqis72guq-lm.a.run.app/tz-front/generate_images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic cmVuZXNhbmRybzpxd2VydHkxMjM0",
          },
          body: JSON.stringify(task),
        }
      );
      const data = await response.json();
      toast.success(data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-full h-screen">
      <Navbar />
      <div className="flex w-full h-full justify-center">
        <div className="flex flex-col w-1/3 mt-[200px]">
          <span className="text-start w-full font-bold text-5xl">
            {task?.task_name}
          </span>
          <span className="text-start text-neutral-500 mb-5">
            Change task's parameters
          </span>

          {editingText.length === 0 && editingImages.length === 0 ? (
            <div className="text-lg text-neutral-500 text-center">
              No layers to edit
            </div>
          ) : (
            <div className="mb-10 border p-4 rounded-lg flex flex-col gap-4">
              <div>
                {editingText.length > 0 && (
                  <>
                    <span className="text-lg font-bold">Text layers</span>
                    {editingText.map((text, index) => (
                      <Accordion type="single" collapsible key={index}>
                        <AccordionItem value={text.layer_name}>
                          <AccordionTrigger>
                            <span className="text-lg font-bold">
                              {text.layer_name}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4">
                            <ChangeDimention
                              value={text}
                              setEditing={setEditingText}
                              index={index}
                            />
                            <ChangeFlow
                              setEditing={setEditingText}
                              index={index}
                            />
                            <div className="inline-block border-b"></div>
                            <InputTextRef />
                            <InputMutualPrompts
                              value={text}
                              setEditing={setEditingText}
                              index={index}
                            />
                            <InputGenPerRef
                              value={text}
                              setEditing={setEditingText}
                              index={index}
                            />
                            <SelectStyles
                              setEditing={setEditingText}
                              index={index}
                            />
                            <button
                              className="bg-neutral-900 text-white rounded-md p-2"
                              onClick={() => handleGenerate(text)}
                            >
                              Generate
                            </button>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </>
                )}
              </div>
              <div>
                {editingImages.length > 0 && (
                  <>
                    <span className="text-lg font-bold">Image layers</span>
                    {editingImages.map((image, index) => (
                      <Accordion type="single" collapsible key={index}>
                        <AccordionItem value={image.layer_name}>
                          <AccordionTrigger>
                            <span className="text-lg font-bold">
                              {image.layer_name}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="flex flex-col gap-4">
                            <ChangeDimention
                              value={image}
                              setEditing={setEditingImages}
                              index={index}
                            />
                            <ChangeFlow
                              setEditing={setEditingImages}
                              index={index}
                            />
                            <div className="inline-block border-b"></div>
                            <ImageRefs
                              setEditing={setEditingImages}
                              index={index}
                              imageRefs={image.images}
                              value_type="image"
                            />
                            <InputMutualPrompts
                              value={image}
                              setEditing={setEditingImages}
                              index={index}
                            />
                            <InputGenPerRef
                              value={image}
                              setEditing={setEditingImages}
                              index={index}
                            />
                            <SelectStyles
                              setEditing={setEditingImages}
                              index={index}
                            />
                            <button
                              className="bg-neutral-900 text-white rounded-md p-2"
                              onClick={() => handleGenerate(image)}
                            >
                              Generate
                            </button>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default TaskComponent;
