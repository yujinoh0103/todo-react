import React, { useState } from "react";

// 개별 시간 블록 컴포넌트
interface TimeBlockProps {
  time: string;
  selectedTimes: Set<string>;
  toggleTime: (time: string) => void;
}

const TimeBlock: React.FC<TimeBlockProps> = ({
  time,
  selectedTimes,
  toggleTime,
}) => {
  return (
    <div
      className="time-block"
      style={{
        backgroundColor: selectedTimes.has(time)
          ? (window as any).currentPenColor
          : "",
      }}
      onClick={() => toggleTime(time)} // 클릭하면 색 변경
    >
      {time}
    </div>
  );
};

// 시간 그리드 컴포넌트
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
                selectedTimes={selectedTimes}
                toggleTime={toggleTime}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

// WhenToMeet 컴포넌트
interface WhenToMeetProps {
  index: number;
}

const WhenToMeet: React.FC<WhenToMeetProps> = ({ index }) => {
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());

  // 클릭 시 해당 시간의 선택/해제 처리
  const toggleTime = (time: string) => {
    setSelectedTimes((prev) => {
      const newSet = new Set(prev);
      newSet.has(time) ? newSet.delete(time) : newSet.add(time);
      return newSet;
    });
  };

  return (
    <div className="when-to-meet">
      <TimeGrid selectedTimes={selectedTimes} toggleTime={toggleTime} />
    </div>
  );
};

export default WhenToMeet;
