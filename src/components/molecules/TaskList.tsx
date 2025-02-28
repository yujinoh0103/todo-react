import React from "react";
import TaskItem from "../atoms/TaskItem"; // ✅ TaskItem으로 분리
import { Task } from "../../types";

interface TaskListProps {
  tasks: Task[];
  categoryColor: string;
  onToggleTask: (index: number) => void;
  onRemoveTask: (index: number) => void;
  onChangePenColor: (color: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  categoryColor,
  onToggleTask,
  onRemoveTask,
  onChangePenColor,
}) => {
  return (
    <ul className="task-list">
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          text={task.text}
          deadline={task.deadline}
          completed={task.completed}
          color={categoryColor}
          onClick={() => onChangePenColor(categoryColor)}
          onToggle={() => onToggleTask(index)}
          onRemove={() => onRemoveTask(index)}
        />
      ))}
    </ul>
  );
};

export default TaskList;
