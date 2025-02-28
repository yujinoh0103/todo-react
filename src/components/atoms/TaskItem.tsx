import React from "react";

interface TaskItemProps {
  text: string;
  deadline: string | null;
  completed: boolean;
  color: string;
  onClick: () => void;
  onToggle: () => void;
  onRemove: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  text,
  deadline,
  completed,
  color,
  onClick,
  onToggle,
  onRemove,
}) => {
  return (
    <li
      className={`task-item ${completed ? "completed" : ""}`}
      style={{ color, cursor: "pointer", listStyle: "none" }}
      onClick={onClick}
    >
      <span>
        {text} {deadline ? `(${deadline})` : ""}
      </span>
      <button onClick={onToggle}>✔</button>
      <button onClick={onRemove}>🗑</button>
    </li>
  );
};

export default TaskItem;
