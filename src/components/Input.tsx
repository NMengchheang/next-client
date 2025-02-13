import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({ disabled = false, className = "", ...props }) => (
    <input
      disabled={disabled}
      className={`${className} text-xl bg-slate-100 rounded-md p-2 border border-s-4 border-gray-600`}
      {...props}
    />
);
  
export default Input;