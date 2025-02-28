import { useState } from "react";

export const useDate = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  const formatLocalDate = (date: Date): string =>
    date.toISOString().split("T")[0];

  return { selectedDate, setSelectedDate, formatLocalDate };
};
