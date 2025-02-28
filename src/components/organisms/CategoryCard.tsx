import React from "react";
import { Category } from "../../types";
import ProgressBar from "../atoms/ProgressBar";
import TaskInput from "../molecules/TaskInput";
import TaskList from "../molecules/TaskList";

interface CategoryCardProps {
  category: Category;
  onRemoveCategory: (name: string) => void;
  onAddTask: (text: string, deadline: string | null) => void;
  onRemoveTask: (index: number) => void;
  onToggleTask: (index: number) => void;
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
  const progress =
    category.tasks.length > 0
      ? Math.round(
          (category.tasks.filter((t) => t.completed).length /
            category.tasks.length) *
            100
        )
      : 0;

  return (
    <div className="category-card" style={{ backgroundColor: category.color }}>
      <h3>
        {category.name}{" "}
        <button onClick={() => onRemoveCategory(category.name)}>❌</button>
      </h3>
      <ProgressBar progress={progress} />
      <TaskList
        tasks={category.tasks}
        categoryColor={category.color}
        onToggleTask={onToggleTask}
        onRemoveTask={onRemoveTask}
        onChangePenColor={onChangePenColor}
      />
      <TaskInput onAddTask={onAddTask} />
    </div>
  );
};

export default CategoryCard;
