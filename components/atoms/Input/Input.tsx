"use client";

type InputProps = {
  placeholder?: string;
  callback: (e: string) => void;
};

const Input = ({ placeholder, callback }: InputProps) => {
  return (
    <input
      className="border border-slate py-1 px-2 rounded-lg text-primary focus:outline-0"
      type="text"
      placeholder={placeholder}
      onChange={(e) => callback(e.target.value)}
    />
  );
};

export default Input;
