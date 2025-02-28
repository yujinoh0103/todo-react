import React from "react";

const WeekdayHeader: React.FC = () => {
  return (
    <div className="weekdays">
      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
        <div key={w}>{w}</div>
      ))}
    </div>
  );
};

export default WeekdayHeader;
