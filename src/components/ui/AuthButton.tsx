import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
}

const AuthButton = ({
  children,
  className,
  disabled,
  variant = "primary",
  ...props
}: AuthButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={clsx(
        "w-full h-12 rounded-full",
        "flex justify-center items-center",
        "text-base font-semibold",
        "transition-opacity duration-200",
        variant === "primary" && "bg-primary text-app-background",
        variant === "secondary" && "bg-background-secondary text-white",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "hover:opacity-90 active:opacity-80",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default AuthButton;
