import React from "react";
import WhenToMeet from "./components/organisms/WhenToMeet";
import Calendar from "./components/templates/CalendarLayout";
import CategoryCard from "./components/organisms/CategoryCard";
import { useCategory } from "./hooks/useCategory";
import { useTask } from "./hooks/useTask";
import { useDate } from "./hooks/useDate";
import { usePenColor } from "./hooks/usePenColor";
import { DateProvider } from "./contexts/SetDate";
import DaysGrid from "./components/molecules/DaysGrid";
const App: React.FC = () => {
  const { categories, addCategory, removeCategory } = useCategory();
  const { tasksByDate, setTasksByDate } = useTask();
  const { selectedDate, setSelectedDate, formatLocalDate } = useDate();
  const { currentPenColor, setCurrentPenColor } = usePenColor();

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value ? new Date(e.target.value) : new Date();
    newDate.setHours(0, 0, 0, 0);
    setSelectedDate(newDate);
  };

  const selectedDateStr = formatLocalDate(selectedDate);

  return (
    <div>
      <DateProvider>
        <Calendar />

        <div>value={selectedDateStr}</div>

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
        </div>
      </DateProvider>
    </div>
  );
};

export default App;
