import { Category } from "../types";

export const addCategoryToList = (
  categories: { [name: string]: Category },
  name: string,
  color: string
) => {
  if (!name || categories[name]) return categories;
  return { ...categories, [name]: { name, color, tasks: [] } };
};
