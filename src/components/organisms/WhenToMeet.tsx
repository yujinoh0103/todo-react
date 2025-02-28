import React, { useState } from "react";
import TimeGrid from "../molecules/TimeGrid";

interface WhenToMeetProps {
  index: number;
}

const WhenToMeet: React.FC<WhenToMeetProps> = ({ index }) => {
  const [selectedTimes, setSelectedTimes] = useState<Set<string>>(new Set());

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
