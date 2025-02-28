import { useState } from "react";

export const usePenColor = () => {
  const [currentPenColor, setCurrentPenColor] = useState<string>("#000000");
  return { currentPenColor, setCurrentPenColor };
};
