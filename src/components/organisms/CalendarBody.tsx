import React from "react";
import WeekdayHeader from "../molecules/WeekdayHeader";
import DaysGrid from "../molecules/DaysGrid";

interface CalendarBodyProps {
  daysArray: (number | null)[];
  year: number;
  month: number;
  selectedDate: Date;
  handleClickDay: (day: number) => void;
}

const CalendarBody: React.FC<CalendarBodyProps> = (props) => {
  return (
    <div>
      <WeekdayHeader />
      <DaysGrid {...props} />
    </div>
  );
};

export default CalendarBody;
