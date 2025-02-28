export interface Task {
  text: string;
  category: string; // 새로 추가
  deadline: string | null; // "YYYY-MM-DD" 형태
  completed: boolean;
}

// 날짜별 태스크 목록
export interface TasksByDate {
  [date: string]: Task[]; // Task[] 형태로 통일
}

export interface Category {
  name: string;
  color: string;
  tasks: Task[];
}
