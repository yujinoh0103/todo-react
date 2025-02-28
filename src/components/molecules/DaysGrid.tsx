import React from "react";
import DayBlock from "../atoms/DayBlock";
import { useDate } from "../../contexts/SetDate"; // Context 훅 가져오기

interface DaysGridProps {
  daysArray: (number | null)[];
  year: number;
  month: number;
}

const DaysGrid: React.FC<DaysGridProps> = ({ daysArray, year, month }) => {
  // 1. Context에서 selectedDate와 setSelectedDate를 가져옵니다.
  const { selectedDate, setSelectedDate } = useDate();

  return (
    <div className="days">
      {daysArray.map((value, i) => {
        if (value === null) {
          return <div key={i} className="empty" />;
        }

        return (
          <DayBlock
            key={i}
            day={value}
            isToday={checkIsToday(year, month, value)}
            isSelected={checkIsSelected(selectedDate, year, month, value)}
            onClick={() => {
              // 2. 날짜를 클릭하면 setSelectedDate로 전역 상태 변경
              const newDate = new Date(year, month, value);
              setSelectedDate(newDate);
            }}
          />
        );
      })}
    </div>
  );
};

// 날짜 비교 함수들
function checkIsToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

function checkIsSelected(
  selected: Date,
  year: number,
  month: number,
  day: number
): boolean {
  const checkDate = new Date(year, month, day);
  checkDate.setHours(0, 0, 0, 0);
  return selected.getTime() === checkDate.getTime();
}

export default DaysGrid;
