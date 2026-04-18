import React from "react";

interface FontSelectorProps {
  value: string;
  onChange: (font: string) => void;
  options: string[];
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  value,
  onChange,
  options,
}) => (
  <select
    className="border rounded px-2 py-1"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  >
    {options.map((font) => (
      <option key={font} value={font}>
        {font}
      </option>
    ))}
  </select>
);
