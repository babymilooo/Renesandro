import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Task } from "./Store/Provider/Provider";
import { useTaskContext } from "./Store/Hooks/useTaskContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Components/Ui/Select";
const TaskComponent = () => {
  const { id } = useParams();
  const { findTask } = useTaskContext();

  const [task, setTask] = useState<Task | undefined>(undefined);
  useEffect(() => {
    const task = findTask(id as string);
    setTask(task);
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="flex w-full h-full justify-center items-center">
        <div className="flex flex-col justify-center w-1/3">
          <span className="text-start w-full font-bold text-5xl">
            {task?.task_name}
          </span>
          <span className="text-start text-neutral-500 mb-5">
            Change task's parameters
          </span>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
