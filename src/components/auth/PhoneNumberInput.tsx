import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import type { FocusEvent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import AuthInputError from "@/components/ui/AuthInputError";
import type { CountryItem } from "@/constants/sports/contry-codes";
import { getFlagEmoji } from "@/utils/country";
import { isInputDigit } from "@/utils/regex";

import CountryPickerModal from "./CountryPickerModal";

interface PhoneNumberInputProps {
  country: CountryItem;
  onCountryChange: (country: CountryItem) => void;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
}

const PhoneNumberInput = ({
  country,
  onCountryChange,
  value,
  onChangeText,
  onBlur,
  error,
  className,
}: PhoneNumberInputProps) => {
  const [showPicker, setShowPicker] = useState(false);
  const { t } = useTranslation();

  const handleNumberChange = (text: string) => {
    if (text === "" || isInputDigit(text)) {
      onChangeText(text);
    }
  };

  return (
    <div>
      <CountryPickerModal
        visible={showPicker}
        onClose={() => setShowPicker(false)}
        onSelect={onCountryChange}
      />
      <div className={clsx("flex gap-3 items-center", className)}>
        <button
          type="button"
          className={clsx(
            "h-[54px] px-3 flex justify-center items-center rounded-xl",
            "border border-border-input bg-background-secondary",
            "hover:opacity-90 transition-opacity"
          )}
          onClick={() => setShowPicker(true)}
        >
          <span className="text-xl mr-1">{getFlagEmoji(country.code)}</span>
          <span className="text-white text-sm font-semibold mr-3">
            {country.dial_code}
          </span>
          <ChevronDown className="w-4 h-4 text-theme-gray-2" />
        </button>

        <div
          className={clsx(
            "flex-1 h-[54px] px-4 flex items-center rounded-xl",
            "border border-border-input bg-background-secondary"
          )}
        >
          <input
            type="tel"
            placeholder={t("auth.enterMobileNumber")}
            className="flex-1 bg-transparent text-white text-base outline-none"
            value={value}
            onChange={(e) => handleNumberChange(e.target.value)}
            onBlur={onBlur}
          />
        </div>
      </div>
      <AuthInputError error={error} className="mt-2" />
    </div>
  );
};

export default PhoneNumberInput;
