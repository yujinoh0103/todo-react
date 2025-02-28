import React, { createContext, useContext, useState } from "react";

// 1. DateContext 생성
const DateContext = createContext<
  | {
      selectedDate: Date;
      setSelectedDate: (date: Date) => void;
    }
  | undefined
>(undefined);

// 2. Provider 정의
// 주의: Provider 컴포넌트에는 children이 필요하므로, React.FC<{ children?: React.ReactNode }> 형태가 되어야 합니다.
export const DateProvider: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
  });

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

// 3. useDate 훅
export const useDate = () => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error("useDate must be used within a DateProvider");
  }
  return context;
};
