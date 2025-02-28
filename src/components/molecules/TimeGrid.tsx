import React from "react";
import TimeBlock from "../atoms/TimeBlock";

interface TimeGridProps {
  selectedTimes: Set<string>;
  toggleTime: (time: string) => void;
}

const TimeGrid: React.FC<TimeGridProps> = ({ selectedTimes, toggleTime }) => {
  return (
    <div className="time-grid-container">
      <div className="time-grid">
        {[...Array(17)].map((_, i) =>
          ["00", "10", "20", "30", "40", "50"].map((min) => {
            const hour = i + 7;
            const timeStr = `${hour.toString().padStart(2, "0")}:${min}`;
            return (
              <TimeBlock
                key={timeStr}
                time={timeStr}
                isSelected={selectedTimes.has(timeStr)}
                onClick={() => toggleTime(timeStr)}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TimeGrid;
