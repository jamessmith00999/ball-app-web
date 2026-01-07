import clsx from "clsx";
import { Eye, EyeOff } from "lucide-react";
import type { FocusEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthInputError from "@/components/ui/AuthInputError";

interface PasswordInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
}

const PasswordInput = ({
  value,
  onChangeText,
  onBlur,
  error,
  placeholder,
}: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <div
        className={clsx(
          "h-[54px] px-4 flex items-center rounded-xl",
          "border border-border-input bg-background-secondary"
        )}
      >
        <input
          type={isPasswordVisible ? "text" : "password"}
          placeholder={placeholder || t("auth.enterPassword")}
          className="flex-1 bg-transparent text-white text-base outline-none"
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          onBlur={onBlur}
        />
        <button
          type="button"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          className="p-1 hover:opacity-80 transition-opacity"
        >
          {isPasswordVisible ? (
            <Eye className="w-5 h-5 text-theme-gray-2" />
          ) : (
            <EyeOff className="w-5 h-5 text-theme-gray-2" />
          )}
        </button>
      </div>
      <AuthInputError error={error} className="mt-2" />
    </div>
  );
};

export default PasswordInput;
