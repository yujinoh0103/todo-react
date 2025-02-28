import React from "react";

interface DayBlockProps {
  day: number;
  isToday: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const DayBlock: React.FC<DayBlockProps> = ({
  day,
  isToday,
  isSelected,
  onClick,
}) => {
  return (
    <div
      className={`day ${isToday ? "today" : ""} ${
        isSelected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      {day}
    </div>
  );
};

export default DayBlock;
