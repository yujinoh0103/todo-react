import { useState, useEffect } from "react";
import { TasksByDate } from "../types";

export const useTask = () => {
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasksByDate");
    if (savedTasks) setTasksByDate(JSON.parse(savedTasks));
  }, []);

  useEffect(() => {
    localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
  }, [tasksByDate]);

  return { tasksByDate, setTasksByDate };
};
