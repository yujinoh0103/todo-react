import React from "react";
import Button from "../atoms/Button";

interface CalendarNavProps {
  goToPrevMonth: () => void;
  goToNextMonth: () => void;
  goToToday: () => void;
  goToSelected: () => void;
}

const CalendarNav: React.FC<CalendarNavProps> = ({
  goToPrevMonth,
  goToNextMonth,
  goToToday,
  goToSelected,
}) => {
  return (
    <div className="calendar-nav">
      <Button onClick={goToPrevMonth} label="Prev" />
      <Button onClick={goToNextMonth} label="Next" />
      <Button onClick={goToToday} label="Go Today" />
      <Button onClick={goToSelected} label="Go Selected" />
    </div>
  );
};

export default CalendarNav;
