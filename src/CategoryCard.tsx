// CategoryCard.tsx
import React, { useState } from "react";
import { Category } from "./types";

interface CategoryCardProps {
  category: Category;
  onRemoveCategory: (name: string) => void;
  onAddTask: (catName: string, text: string, deadline: string | null) => void;
  onRemoveTask: (catName: string, index: number) => void;
  onToggleTask: (catName: string, index: number) => void;
  onChangePenColor: (color: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onRemoveCategory,
  onAddTask,
  onRemoveTask,
  onToggleTask,
  onChangePenColor,
}) => {
  const [taskText, setTaskText] = useState("");
  const [taskDeadline, setTaskDeadline] = useState<string | null>(null);

  const totalTasks = category.tasks.length;
  const completedTasks = category.tasks.filter((t) => t.completed).length;
  const progress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleAddTask = () => {
    onAddTask(category.name, taskText, taskDeadline);
    setTaskText("");
    setTaskDeadline(null);
  };

  return (
    <div
      className="category-card"
      style={{
        marginBottom: "16px",
        backgroundColor: category.color,
        padding: "8px",
      }}
      id={`category-${category.name}`}
    >
      <div
        className="category-title"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>{category.name}</span>
        <button onClick={() => onRemoveCategory(category.name)}>❌</button>
      </div>

      <div
        className="progress-bar-container"
        style={{ background: "#eee", height: "8px", margin: "4px 0" }}
      >
        <div
          className="progress-bar"
          style={{
            width: `${progress}%`,
            backgroundColor: "#333",
            height: "100%",
          }}
        />
      </div>

      <ul className="task-list">
        {category.tasks.map((task, index) => (
          <li
            key={index}
            className={`task-item ${task.completed ? "completed" : ""}`}
            style={{ cursor: "pointer", listStyle: "none" }}
            onClick={() => {
              // 클릭하면 펜 색 변경
              onChangePenColor(category.color);
            }}
          >
            <span>
              {task.text}
              {task.deadline ? ` (${task.deadline})` : ""}
            </span>
            <button onClick={() => onToggleTask(category.name, index)}>
              ✔
            </button>
            <button onClick={() => onRemoveTask(category.name, index)}>
              🗑
            </button>
          </li>
        ))}
      </ul>

      {/* 태스크 추가 */}
      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Add a task"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          style={{ marginRight: "4px" }}
        />
        <input
          type="date"
          value={taskDeadline ?? ""}
          onChange={(e) => setTaskDeadline(e.target.value || null)}
          style={{ marginRight: "4px" }}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
};

export default CategoryCard;
