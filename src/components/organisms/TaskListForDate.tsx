// TaskListForDate.tsx
import React from "react";
import DateTitle from "../atoms/DateTitle";
import TaskList from "../molecules/TaskList";
import { TasksByDate, Category, Task } from "../../types";

interface TaskListForDateProps {
  date: string;
  tasksByDate: TasksByDate;
  categories: { [name: string]: Category };
  onClickTask: (color: string) => void;
  onToggleTask: (index: number) => void;
  onRemoveTask: (index: number) => void;
}

const TaskListForDate: React.FC<TaskListForDateProps> = ({
  date,
  tasksByDate,
  categories,
  onClickTask,
  onToggleTask,
  onRemoveTask,
}) => {
  // date에 해당하는 Task[] 가져오기
  const tasks: Task[] = tasksByDate[date] || [];

  return (
    <div>
      {/* 날짜 타이틀 */}
      <DateTitle date={date} />
      {/* TaskList에 필요한 정보 전달 */}
      <TaskList
        tasks={tasks}
        categoryColor={
          tasks.length > 0
            ? categories[tasks[0].category]?.color || "#000000"
            : "#000000"
        }
        onToggleTask={onToggleTask}
        onRemoveTask={onRemoveTask}
        onChangePenColor={onClickTask}
      />
    </div>
  );
};

export default TaskListForDate;
