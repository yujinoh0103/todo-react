import React, { useState } from "react";
import CalendarNav from "../organisms/CalendarNav";
import CalendarBody from "../organisms/CalendarBody";

const CalendarLayout: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const daysArray: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let day = 1; day <= lastDate; day++) daysArray.push(day);

  const handleClickDay = (day: number) => {
    const newSelected = new Date(year, month, day);
    newSelected.setHours(0, 0, 0, 0);
    setSelectedDate(newSelected);
  };

  return (
    <div>
      <CalendarNav
        goToPrevMonth={() => setSelectedDate(new Date(year, month - 1, 1))}
        goToNextMonth={() => setSelectedDate(new Date(year, month + 1, 1))}
        goToToday={() => setSelectedDate(new Date())}
        goToSelected={() => setSelectedDate(new Date(year, month, 1))}
      />
      <h2>
        {new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(selectedDate)}
      </h2>
      <CalendarBody
        daysArray={daysArray}
        year={year}
        month={month}
        selectedDate={selectedDate}
        handleClickDay={handleClickDay}
      />
    </div>
  );
};

export default CalendarLayout;
