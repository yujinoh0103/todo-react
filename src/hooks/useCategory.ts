import { useState, useEffect } from "react";
import { Category } from "../types";

export const useCategory = () => {
  const [categories, setCategories] = useState<{ [name: string]: Category }>(
    {}
  );

  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const addCategory = (name: string, color: string) => {
    if (!name || categories[name]) return;
    setCategories((prev) => ({ ...prev, [name]: { name, color, tasks: [] } }));
  };

  const removeCategory = (name: string) => {
    setCategories((prev) => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  return { categories, addCategory, removeCategory };
};
