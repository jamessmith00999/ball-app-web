import clsx from "clsx";
import { useAtom, useSetAtom } from "jotai";
import type { FocusEvent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import AuthInputError from "@/components/ui/AuthInputError";
import { MAX_VERIFICATION_CODE_LENGTH } from "@/constants/sports";
import { EMAIL_COUNTDOWN_TIME } from "@/constants/sports/time";
import { alertAtom } from "@/contexts/alert";
import { verificationCodeExpiryMapAtom } from "@/contexts/verification-code";
import { isInputDigit } from "@/utils/regex";

interface VerificationCodeInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  error?: string;
  onSendCode: () => Promise<{
    success: boolean;
    message?: string;
  }>;
  disabledSendCodeButton?: boolean;
  keyForCacheSendCode: string;
}

const VerificationCodeInput = ({
  value,
  onChangeText,
  onBlur,
  error,
  onSendCode,
  disabledSendCodeButton,
  keyForCacheSendCode,
}: VerificationCodeInputProps) => {
  const { t } = useTranslation();
  const [isSending, setIsSending] = useState(false);
  const [verificationCodeExpiryMap, setVerificationCodeExpiryMap] = useAtom(
    verificationCodeExpiryMapAtom
  );
  const setAlert = useSetAtom(alertAtom);
  const [countdown, setCountdown] = useState(0);

  const expiryTime = verificationCodeExpiryMap[keyForCacheSendCode];

  const setExpiryTime = (seconds: number) => {
    const newExpiryTime = seconds > 0 ? Date.now() + seconds * 1000 : 0;
    setVerificationCodeExpiryMap((prev) => ({
      ...prev,
      [keyForCacheSendCode]: newExpiryTime,
    }));
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    const updateCountdown = () => {
      if (expiryTime && expiryTime > Date.now()) {
        const remainingSeconds = Math.ceil((expiryTime - Date.now()) / 1000);
        setCountdown(remainingSeconds);
      } else {
        setCountdown(0);
      }
    };

    updateCountdown();

    if (expiryTime && expiryTime > Date.now()) {
      timer = setInterval(updateCountdown, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [expiryTime]);

  const handleSendCode = async () => {
    if (countdown > 0 || isSending || !onSendCode) return;

    try {
      setIsSending(true);
      const { success, message } = await onSendCode();
      if (success) {
        setExpiryTime(EMAIL_COUNTDOWN_TIME);
      } else {
        setAlert({
          isVisible: true,
          message: message || t("auth.sendCodeError"),
          type: "error",
        });
      }
    } catch (error) {
      console.error("Failed to send code:", error);
      setAlert({
        isVisible: true,
        message: t("auth.sendCodeRateLimit"),
        type: "error",
      });
    } finally {
      setIsSending(false);
    }
  };

  const disabled = countdown > 0 || isSending || disabledSendCodeButton;

  return (
    <div>
      <div
        className={clsx(
          "h-[54px] px-4 flex items-center rounded-xl",
          "border border-border-input bg-background-secondary"
        )}
      >
        <input
          type="text"
          inputMode="numeric"
          placeholder={t("auth.verificationCode")}
          className="flex-1 bg-transparent text-white text-base font-semibold outline-none"
          value={value}
          onChange={(e) => {
            const text = e.target.value;
            if (text === "" || isInputDigit(text)) {
              onChangeText(text);
            }
          }}
          maxLength={MAX_VERIFICATION_CODE_LENGTH}
          onBlur={onBlur}
        />
        {(!countdown || countdown === 0) && (
          <button
            type="button"
            onClick={handleSendCode}
            disabled={disabled}
            className={clsx(
              "text-sm font-semibold transition-opacity",
              disabled
                ? "text-gray-500 cursor-not-allowed"
                : "text-primary hover:opacity-80"
            )}
          >
            {t("auth.sendCode")}
          </button>
        )}
        {countdown > 0 && (
          <span className="text-theme-gray-2 text-sm ml-2">
            {t("auth.resendTime", { time: countdown })}
          </span>
        )}
      </div>
      <AuthInputError className="mt-2" error={error} />
    </div>
  );
};

export default VerificationCodeInput;
