import React, { useState, useEffect } from "react";
import WhenToMeet from "./when2meet"; // 시간 그리드 컴포넌트
import Calendar from "./calendar"; // 달력 컴포넌트
import TaskListForDate from "./TaskListForDate"; // 날짜별 태스크 목록 컴포넌트
import { Task, Category, TasksByDate } from "./types";

// CSS
import "./App.css";
import "./when2meet.css";
import "./style.css";
import CategoryList from "./category";

// ----------------------------------------------------
// 날짜 포맷 함수 (예: YYYY-MM-DD)
// ----------------------------------------------------
function formatLocalDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

const App: React.FC = () => {
  // ----------------------------------------------------
  // 1) 전체 카테고리 목록 (Key: 카테고리 이름)
  // ----------------------------------------------------
  const [categories, setCategories] = useState<{ [name: string]: Category }>(
    {}
  );

  // ----------------------------------------------------
  // 2) 날짜별 태스크
  // ----------------------------------------------------
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});

  // ----------------------------------------------------
  // 3) 선택된 날짜 (초기값: 오늘)
  // ----------------------------------------------------
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  // ----------------------------------------------------
  // 4) 펜 색상 (선택된 태스크/카테고리에 따라 달라짐)
  // ----------------------------------------------------
  const [currentPenColor, setCurrentPenColor] = useState<string>("#000000");

  // ----------------------------------------------------
  // (A) 로컬 스토리지에서 데이터 불러오기 (마운트 시 1회)
  // ----------------------------------------------------
  useEffect(() => {
    const savedCategories = localStorage.getItem("categories");
    const savedTasksByDate = localStorage.getItem("tasksByDate");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
    if (savedTasksByDate) {
      setTasksByDate(JSON.parse(savedTasksByDate));
    }
  }, []);

  // ----------------------------------------------------
  // (B) 카테고리/태스크가 변경될 때마다 로컬 스토리지 저장
  // ----------------------------------------------------
  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
    localStorage.setItem("tasksByDate", JSON.stringify(tasksByDate));
  }, [categories, tasksByDate]);

  // ----------------------------------------------------
  // 함수: 날짜 선택 변경
  // ----------------------------------------------------
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : new Date();
    newDate.setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
  };

  // ----------------------------------------------------
  // 함수: 카테고리 추가
  // ----------------------------------------------------
  const addCategory = (name: string, color: string) => {
    if (!name || categories[name]) {
      alert("Invalid category name!");
      return;
    }
    const newCategory: Category = {
      name,
      color,
      tasks: [],
    };
    setCategories((prev) => ({
      ...prev,
      [name]: newCategory,
    }));
  };

  // ----------------------------------------------------
  // 함수: 카테고리 삭제
  // ----------------------------------------------------
  const removeCategory = (name: string) => {
    const updated = { ...categories };
    delete updated[name];
    setCategories(updated);
  };

  // ----------------------------------------------------
  // 함수: 카테고리에 태스크 추가
  // ----------------------------------------------------
  const addTaskToCategory = (
    categoryName: string,
    text: string,
    deadline: string | null
  ) => {
    if (!categoryName || !categories[categoryName]) return;
    if (!text.trim()) {
      alert("태스크 내용을 입력하세요!");
      return;
    }

    const newTask: Task = {
      text,
      deadline,
      completed: false,
    };

    // 1) 해당 카테고리의 tasks에 추가
    setCategories((prev) => {
      const copy = { ...prev };
      copy[categoryName] = {
        ...copy[categoryName],
        tasks: [...copy[categoryName].tasks, newTask],
      };
      return copy;
    });

    // 2) 날짜별 목록에도 추가
    if (deadline) {
      setTasksByDate((prev) => {
        const copy = { ...prev };
        if (!copy[deadline]) {
          copy[deadline] = [];
        }
        copy[deadline].push({ text, category: categoryName });
        return copy;
      });
    }
  };

  // ----------------------------------------------------
  // 함수: 태스크 삭제
  // ----------------------------------------------------
  const removeTaskFromCategory = (categoryName: string, index: number) => {
    const cat = categories[categoryName];
    if (!cat) return;

    const removedTask = cat.tasks[index];
    const deadline = removedTask.deadline;

    // 1) 카테고리에서 삭제
    const updatedTasks = [...cat.tasks];
    updatedTasks.splice(index, 1);

    // 2) 날짜별 목록에서 삭제
    if (deadline) {
      setTasksByDate((prev) => {
        const copy = { ...prev };
        if (copy[deadline]) {
          copy[deadline] = copy[deadline].filter(
            (t) => !(t.text === removedTask.text && t.category === categoryName)
          );
        }
        return copy;
      });
    }

    // 카테고리 상태 갱신
    setCategories((prev) => {
      const copy = { ...prev };
      copy[categoryName] = {
        ...cat,
        tasks: updatedTasks,
      };
      return copy;
    });
  };

  // ----------------------------------------------------
  // 함수: 태스크 완료 여부 토글
  // ----------------------------------------------------
  const toggleTaskCompleted = (categoryName: string, index: number) => {
    const cat = categories[categoryName];
    if (!cat) return;

    const updatedTasks = [...cat.tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,
    };

    setCategories((prev) => ({
      ...prev,
      [categoryName]: {
        ...prev[categoryName],
        tasks: updatedTasks,
      },
    }));
  };

  // ----------------------------------------------------
  // 선택된 날짜를 YYYY-MM-DD 문자열로
  // ----------------------------------------------------
  const selectedDateStr = formatLocalDate(selectedDate);

  // ----------------------------------------------------
  // UI 렌더
  // ----------------------------------------------------
  return (
    <div>
      <Calendar />

      {/* 2) 메인 컨텐츠: 날짜별 태스크 + 카테고리 목록 */}
      <div>
        {/* 왼쪽: 날짜 선택 + 해당 날짜 태스크 목록 */}

        <h1>Tasks By Selected Date</h1>
        <input
          type="date"
          value={selectedDateStr}
          onChange={handleDateChange}
        />
        <TaskListForDate
          date={selectedDateStr}
          tasksByDate={tasksByDate}
          categories={categories}
          onClickTask={(color) => {
            setCurrentPenColor(color);
          }}
        />
      </div>
      <div>
        <h1>Categories</h1>
        <div style={{ marginBottom: "16px" }}>
          <input type="text" id="category-name" placeholder="카테고리 이름" />
          <input type="color" id="category-color" defaultValue="#dddddd" />
          <button
            onClick={() => {
              const name = (
                document.getElementById("category-name") as HTMLInputElement
              )?.value.trim();
              const color = (
                document.getElementById("category-color") as HTMLInputElement
              )?.value;
              if (name && color) addCategory(name, color);
            }}
          >
            Add Category
          </button>
        </div>
        <div
          className="timegrid-containers"
          style={{ display: "flex", gap: "20px", flexDirection: "row" }}
        >
          <WhenToMeet index={0} />
          <WhenToMeet index={1} />
        </div>
        <CategoryList
          categories={categories}
          onRemoveCategory={removeCategory}
          onAddTask={addTaskToCategory}
          onRemoveTask={removeTaskFromCategory}
          onToggleTask={toggleTaskCompleted}
          onChangePenColor={(color: React.SetStateAction<string>) => {
            setCurrentPenColor(color);
          }}
        />
      </div>
    </div>
  );
};

export default App;
