// TaskListForDate.tsx
import React from "react";
import { TasksByDate, Category } from "./types";

interface TaskListForDateProps {
  date: string; // YYYY-MM-DD
  tasksByDate: TasksByDate;
  categories: { [name: string]: Category };
  onClickTask: (color: string) => void;
}

const TaskListForDate: React.FC<TaskListForDateProps> = ({
  date,
  tasksByDate,
  categories,
  onClickTask,
}) => {
  const tasks = tasksByDate[date] || [];

  return (
    <div>
      <h2>{date} 의 태스크</h2>
      <ul>
        {tasks.map((task, idx) => {
          const catColor = categories[task.category]?.color || "#000000";
          return (
            <li
              key={idx}
              style={{ color: catColor, cursor: "pointer", listStyle: "none" }}
              onClick={() => onClickTask(catColor)}
            >
              {task.text} ({task.category})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TaskListForDate;
