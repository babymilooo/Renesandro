import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../Types/Types";

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Task) => void;
  findTask: (id: string) => Task | undefined;
};

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: uuidv4(),
      task_name: "RS_D",
      dimension: "1x1",
      template_id: "mwpswxcudtwxb",
      image_layers: ["image1", "image2"],
      text_layers: ["text1", "text2"],
      amount: 40,
      gen_type: "cyclic_generation",
    },
  ]);

  const addTask = (task: Task) => {
    const newTask = { ...task, id: uuidv4() };
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  const findTask = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, findTask }}>
      {children}
    </TaskContext.Provider>
  );
};
