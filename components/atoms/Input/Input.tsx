"use client";

import { InputProps } from "@/types/types";

const Input = ({ placeholder, callback, value }: InputProps) => {
  return (
    <input
      className="border border-slate py-1 px-2 rounded-lg text-primary focus:outline-0"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => callback(e.target.value)}
      data-testid="main-input"
    />
  );
};

export default Input;
