import React from "react";

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Slider: React.FC<SliderProps> = (props) => (
  <input type="range" className="w-full" {...props} />
);
