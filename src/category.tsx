// CategoryList.tsx
import React from "react";
import { Category } from "./types";
import { CategoryCard } from "./CategoryCard";

interface CategoryListProps {
  categories: { [name: string]: Category };
  onRemoveCategory: (name: string) => void;
  onAddTask: (catName: string, text: string, deadline: string | null) => void;
  onRemoveTask: (catName: string, index: number) => void;
  onToggleTask: (catName: string, index: number) => void;
  onChangePenColor: (color: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onRemoveCategory,
  onAddTask,
  onRemoveTask,
  onToggleTask,
  onChangePenColor,
}) => {
  const categoryNames = Object.keys(categories);

  return (
    <div>
      {categoryNames.map((catName) => {
        const category = categories[catName];
        return (
          <CategoryCard
            key={catName}
            category={category}
            onRemoveCategory={onRemoveCategory}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onToggleTask={onToggleTask}
            onChangePenColor={onChangePenColor}
          />
        );
      })}
    </div>
  );
};

export default CategoryList;
