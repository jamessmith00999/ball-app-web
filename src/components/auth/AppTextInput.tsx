import clsx from "clsx";
import type { FocusEvent } from "react";

import AuthInputError from "@/components/ui/AuthInputError";

interface AppTextInputProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  type?: "text" | "email" | "tel";
}

const AppTextInput = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  type = "text",
}: AppTextInputProps) => {
  return (
    <div>
      <div
        className={clsx(
          "h-[54px] px-4 flex items-center rounded-xl",
          "border border-border-input bg-background-secondary"
        )}
      >
        <input
          type={type}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-white text-base outline-none"
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <AuthInputError className="mt-2" error={error} />
    </div>
  );
};

export default AppTextInput;
