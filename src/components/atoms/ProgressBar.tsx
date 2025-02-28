import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div
      className="progress-bar-container"
      style={{ background: "#eee", height: "8px", margin: "4px 0" }}
    >
      <div
        className="progress-bar"
        style={{
          width: `${progress}%`,
          backgroundColor: "#333",
          height: "100%",
        }}
      />
    </div>
  );
};

export default ProgressBar;
