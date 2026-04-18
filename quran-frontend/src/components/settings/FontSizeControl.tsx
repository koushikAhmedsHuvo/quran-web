import React from "react";

interface FontSizeControlProps {
  value: number;
  onChange: (size: number) => void;
  min?: number;
  max?: number;
}

export const FontSizeControl: React.FC<FontSizeControlProps> = ({
  value,
  onChange,
  min = 16,
  max = 48,
}) => (
  <input
    type="range"
    min={min}
    max={max}
    value={value}
    onChange={(e) => onChange(Number(e.target.value))}
    className="w-full"
  />
);
