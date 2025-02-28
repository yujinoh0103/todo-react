import React from "react";
import WhenToMeet from "../organisms/WhenToMeet";

const SchedulePage: React.FC = () => {
  return (
    <div>
      <h1>일정을 선택하세요</h1>
      <WhenToMeet index={1} />
    </div>
  );
};

export default SchedulePage;
