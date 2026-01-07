import clsx from "clsx";
import type { FocusEvent } from "react";
import { useTranslation } from "react-i18next";

import AuthInputError from "@/components/ui/AuthInputError";
import { placeholderTextColor } from "@/constants/sports/colors";

interface EmailInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
}

const EmailInput = ({
  value,
  onChangeText,
  onBlur,
  error,
}: EmailInputProps) => {
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
          type="email"
          placeholder={t("auth.enterEmail")}
          className="flex-1 bg-transparent text-white text-base outline-none"
          style={{ color: "white" }}
          value={value}
          onChange={(e) => onChangeText(e.target.value)}
          onBlur={onBlur}
        />
      </div>
      <AuthInputError error={error} className="mt-2" />
    </div>
  );
};

// Export placeholderTextColor for use in inline styles if needed
export { placeholderTextColor };
export default EmailInput;
