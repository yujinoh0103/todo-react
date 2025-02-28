import { Task } from "../types";

export const addTaskToList = (
  tasks: Task[],
  text: string,
  category: string, // 추가
  deadline: string | null
): Task[] => {
  if (!text.trim()) return tasks;
  return [...tasks, { text, category, deadline, completed: false }];
};
