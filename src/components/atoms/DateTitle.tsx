import React from "react";

interface DateTitleProps {
  date: string;
}

const DateTitle: React.FC<DateTitleProps> = ({ date }) => {
  return <h2>{date} 의 태스크</h2>;
};

export default DateTitle;
