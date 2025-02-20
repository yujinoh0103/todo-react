export interface Task {
  text: string;
  deadline: string | null; // "YYYY-MM-DD" 형태
  completed: boolean;
}

export interface Category {
  name: string;
  color: string;
  tasks: Task[];
}

// 날짜별 태스크 목록 (Optional: 사용 방식에 따라 달라질 수 있음)
export interface TasksByDate {
  [date: string]: { text: string; category: string }[];
}
