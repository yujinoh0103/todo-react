import React, { useState } from "react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";

interface TaskInputProps {
  onAddTask: (text: string, deadline: string | null) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState("");
  const [taskDeadline, setTaskDeadline] = useState<string | null>(null);

  const handleAddTask = () => {
    if (taskText.trim() !== "") {
      onAddTask(taskText, taskDeadline);
      setTaskText("");
      setTaskDeadline(null);
    }
  };

  return (
    <div>
      <Input
        type="text"
        value={taskText}
        placeholder="Add a task"
        onChange={(e) => setTaskText(e.target.value)}
      />
      <Input
        type="date"
        value={taskDeadline ?? ""}
        onChange={(e) => setTaskDeadline(e.target.value || null)}
      />
      <Button onClick={handleAddTask} label="Add" />
    </div>
  );
};

export default TaskInput;
