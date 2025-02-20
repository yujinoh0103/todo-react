import React, { useState } from "react";

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // 현재 연/월 계산
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // '일' 계산
  const firstDay = new Date(year, month, 1).getDay(); // 해당 달 1일의 요일(0=일,1=월,...)
  const lastDate = new Date(year, month + 1, 0).getDate(); // 해당 달의 마지막 날짜

  // "빈칸 + 날짜"를 담을 배열
  const daysArray: (number | null)[] = [];

  // 1) "빈칸"만큼 null 넣기
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }

  // 2) 실제 날짜 넣기 (1부터 마지막 일자까지)
  for (let day = 1; day <= lastDate; day++) {
    daysArray.push(day);
  }

  // "현재 연월 표시" 포맷
  const formattedMonth = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(selectedDate);

  // 🔹 날짜 클릭 시 실행될 함수
  const handleClickDay = (day: number) => {
    const newSelected = new Date(year, month, day);
    newSelected.setHours(0, 0, 0, 0);
    setSelectedDate(newSelected);
  };

  // 🔹 네비게이션 함수 (map 내부에서 선언되면 안됨!)
  const goToPrevMonth = () => {
    setSelectedDate((prev) => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() - 1);
      return copy;
    });
  };

  const goToNextMonth = () => {
    setSelectedDate((prev) => {
      const copy = new Date(prev);
      copy.setMonth(copy.getMonth() + 1);
      return copy;
    });
  };

  const goToToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    setSelectedDate(today);
  };

  const goToSelected = () => {
    if (!selectedDate) {
      alert("선택한 날짜가 없습니다.");
      return;
    }
  };

  return (
    <div>
      {/* 네비게이션 영역 */}
      <div className="calendar-nav">
        <button onClick={goToPrevMonth}>Prev</button>
        <button onClick={goToNextMonth}>Next</button>
        <button onClick={goToToday}>Go Today</button>
        <button onClick={goToSelected}>Go Selected</button>
      </div>

      {/* 현재 연월 표시 */}
      <h2>{formattedMonth}</h2>

      {/* 요일 헤더 (Sun, Mon...) */}
      <div className="weekdays">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
          <div key={w}>{w}</div>
        ))}
      </div>

      {/* 날짜 표시 영역 */}
      <div className="days">
        {daysArray.map((value, i) => {
          if (value === null) {
            return <div key={i} className="empty"></div>;
          } else {
            const isToday = checkIsToday(year, month, value);
            const isSelected = checkIsSelected(
              selectedDate,
              year,
              month,
              value
            );

            return (
              <div
                key={i}
                className={`day ${isToday ? "today" : ""} ${
                  isSelected ? "selected" : ""
                }`}
                onClick={() => handleClickDay(value)}
              >
                {value}
              </div>
            );
          }
        })}
      </div>

      {/* 선택된 날짜 표시 */}
      <div id="selected-date">{formatLocalDate(selectedDate)}</div>
    </div>
  );
};

// 🔹 날짜 비교 함수들 추가
function checkIsToday(year: number, month: number, day: number): boolean {
  const now = new Date();
  return (
    now.getFullYear() === year &&
    now.getMonth() === month &&
    now.getDate() === day
  );
}

function checkIsSelected(
  selected: Date,
  year: number,
  month: number,
  day: number
): boolean {
  const checkDate = new Date(year, month, day);
  checkDate.setHours(0, 0, 0, 0);
  return selected.getTime() === checkDate.getTime();
}

function formatLocalDate(d: Date): string {
  return d.toLocaleDateString("en-US");
}

export default Calendar;
