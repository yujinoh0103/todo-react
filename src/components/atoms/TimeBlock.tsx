import React from "react";

interface TimeBlockProps {
  time: string;
  isSelected: boolean;
  onClick: () => void;
}

const TimeBlock: React.FC<TimeBlockProps> = ({ time, isSelected, onClick }) => {
  return (
    <div
      className="time-block"
      style={{
        backgroundColor: isSelected ? (window as any).currentPenColor : "",
      }}
      onClick={onClick}
    >
      {time}
    </div>
  );
};

export default TimeBlock;
