import { ButtonProps } from "@/types/types";

const Button = ({ title, isSecondary, callback }: ButtonProps) => {
  return (
    <button
      className={`py-1 px-2 rounded hover:shadow ${
        isSecondary
          ? "bg-slate text-gray hover:text-secondary"
          : "bg-primary text-secondary hover:bg-secondary hover:text-primary"
      } `}
      onClick={callback}
    >
      {title}
    </button>
  );
};

export default Button;
