"use client";

type InputProps = {
  type: string;
  placeholder?: string;
  callback: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ type, placeholder, callback }: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={(e) => callback(e)}
    />
  );
};

export default Input;
