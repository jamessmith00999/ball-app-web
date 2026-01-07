import { useFormik } from "formik";
import { useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { checkUserStatus } from "@/api/futures/user";
import AppTextInput from "@/components/auth/AppTextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import VerificationCodeInput from "@/components/auth/VerificationCodeInput";
import AppHeader from "@/components/ui/AppHeader";
import AuthButton from "@/components/ui/AuthButton";
import TabButton from "../TabButton";
import { DEFAULT_COUNTRY } from "@/constants/sports/contry-codes";
import { alertAtom } from "@/contexts/alert";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-error-mapping";
import { formatPhoneForApi } from "@/utils/strings";
import {
  confirmPasswordValidation,
  emailValidation,
  emailValidationCodeValidation,
  passwordValidation,
  phoneNumberValidation,
} from "@/utils/validation";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const setAlert = useSetAtom(alertAtom);

  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");

  const cellPhoneFormik = useFormik({
    initialValues: {
      country: DEFAULT_COUNTRY,
      phoneNumber: "",
      phoneValidationCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      phoneNumber: phoneNumberValidation(t),
      phoneValidationCode: emailValidationCodeValidation(t),
      password: passwordValidation(t),
      confirmPassword: confirmPasswordValidation(t),
    }),
    onSubmit: () => {},
  });

  const emailFormik = useFormik({
    initialValues: {
      email: "",
      emailValidationCode: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: emailValidation(t),
      emailValidationCode: emailValidationCodeValidation(t),
      password: passwordValidation(t),
      confirmPassword: confirmPasswordValidation(t),
    }),
    onSubmit: () => {},
  });

  const onSendPhoneCode = async () => {
    try {
      const phoneIdentifier = formatPhoneForApi(
        cellPhoneFormik.values.country.dial_code,
        cellPhoneFormik.values.phoneNumber
      );

      const statusResponse = await checkUserStatus({
        login_info: phoneIdentifier,
      });

      if (!statusResponse.data.is_existed) {
        return {
          success: false,
          message: t("auth.phoneNotRegistered"),
        };
      } else if (statusResponse.data.is_admin) {
        return {
          success: false,
          message: t("auth.accountIsAdmin"),
        };
      } else if (statusResponse.data.is_banned) {
        return {
          success: false,
          message: t("auth.accountBanned"),
        };
      }

      // Use Better Auth phone number password reset API
      const { error } = await authClient.phoneNumber.requestPasswordReset({
        phoneNumber: phoneIdentifier,
      });

      if (error) {
        const errorKey = getAuthErrorMessage(error.code, error.message);
        return {
          success: false,
          message: t(errorKey),
        };
      }

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        message: t("auth.errors.unknown"),
      };
    }
  };

  const onSendEmailCode = async () => {
    try {
      const statusResponse = await checkUserStatus({
        login_info: emailFormik.values.email,
      });

      if (!statusResponse.data.is_existed) {
        return {
          success: false,
          message: t("auth.emailNotRegistered"),
        };
      } else if (statusResponse.data.is_admin) {
        return {
          success: false,
          message: t("auth.accountIsAdmin"),
        };
      } else if (statusResponse.data.is_banned) {
        return {
          success: false,
          message: t("auth.accountBanned"),
        };
      }

      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: emailFormik.values.email,
        type: "forget-password",
      });

      if (error) {
        const errorKey = getAuthErrorMessage(error.code, error.message);
        return {
          success: false,
          message: t(errorKey),
        };
      }

      return {
        success: true,
      };
    } catch {
      return {
        success: false,
        message: t("auth.errors.unknown"),
      };
    }
  };

  const disabled = useMemo(() => {
    if (activeTab === "phone") {
      return (
        !cellPhoneFormik.values.phoneNumber ||
        !cellPhoneFormik.values.password ||
        !cellPhoneFormik.values.confirmPassword ||
        !cellPhoneFormik.values.phoneValidationCode ||
        !cellPhoneFormik.isValid
      );
    } else {
      return (
        !emailFormik.values.email ||
        !emailFormik.values.password ||
        !emailFormik.values.confirmPassword ||
        !emailFormik.values.emailValidationCode ||
        !emailFormik.isValid
      );
    }
  }, [
    activeTab,
    cellPhoneFormik.values,
    emailFormik.values,
    cellPhoneFormik.isValid,
    emailFormik.isValid,
  ]);

  const isSubmitting = useMemo(() => {
    if (activeTab === "phone") {
      return cellPhoneFormik.isSubmitting;
    } else {
      return emailFormik.isSubmitting;
    }
  }, [activeTab, cellPhoneFormik.isSubmitting, emailFormik.isSubmitting]);

  const onClickResetPassword = async () => {
    try {
      if (activeTab === "phone") {
        const phoneIdentifier =
          cellPhoneFormik.values.country.dial_code +
          cellPhoneFormik.values.phoneNumber;

        // Use Better Auth phone number reset password API
        const { error } = await authClient.phoneNumber.resetPassword({
          phoneNumber: phoneIdentifier,
          otp: cellPhoneFormik.values.phoneValidationCode,
          newPassword: cellPhoneFormik.values.password,
        });

        if (error) {
          console.error("Reset password error:", error);
          const errorKey = getAuthErrorMessage(error.code, error.message);
          setAlert({
            message: t(errorKey),
            isVisible: true,
            type: "error",
          });
          return;
        }

        setAlert({
          message: t("auth.resetPasswordSuccess"),
          isVisible: true,
          type: "success",
        });

        navigate("/auth/sign-in");
      } else {
        const { error } = await authClient.emailOtp.resetPassword({
          email: emailFormik.values.email,
          otp: emailFormik.values.emailValidationCode,
          password: emailFormik.values.password,
        });

        if (error) {
          console.error("Reset password error:", error);
          const errorKey = getAuthErrorMessage(error.code, error.message);
          setAlert({
            message: t(errorKey),
            isVisible: true,
            type: "error",
          });
          return;
        }

        setAlert({
          message: t("auth.resetPasswordSuccess"),
          isVisible: true,
          type: "success",
        });

        navigate("/auth/sign-in");
      }
    } catch (error) {
      console.error("Reset password exception:", error);
      setAlert({
        message: t("auth.errors.unknown"),
        isVisible: true,
        type: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      <AppHeader>{t("appHeader.forgotPassword")}</AppHeader>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-4">
          {/* tabs */}
          <div className="flex gap-8">
            <TabButton
              title={t("auth.cellPhone")}
              isActive={activeTab === "phone"}
              onPress={() => setActiveTab("phone")}
            />
            <TabButton
              title={t("auth.email")}
              isActive={activeTab === "email"}
              onPress={() => setActiveTab("email")}
            />
          </div>

          {/* content */}
          {activeTab === "phone" && (
            <div className="mt-6 flex flex-col gap-5">
              <PhoneNumberInput
                country={cellPhoneFormik.values.country}
                onCountryChange={(country) =>
                  cellPhoneFormik.setFieldValue("country", country)
                }
                value={cellPhoneFormik.values.phoneNumber}
                onChangeText={(text) =>
                  cellPhoneFormik.setFieldValue("phoneNumber", text)
                }
                onBlur={cellPhoneFormik.handleBlur("phoneNumber")}
                error={
                  cellPhoneFormik.touched.phoneNumber
                    ? cellPhoneFormik.errors.phoneNumber
                    : undefined
                }
              />
              <VerificationCodeInput
                value={cellPhoneFormik.values.phoneValidationCode}
                onChangeText={(text) =>
                  cellPhoneFormik.setFieldValue("phoneValidationCode", text)
                }
                onBlur={cellPhoneFormik.handleBlur("phoneValidationCode")}
                error={
                  cellPhoneFormik.touched.phoneValidationCode
                    ? cellPhoneFormik.errors.phoneValidationCode
                    : undefined
                }
                onSendCode={onSendPhoneCode}
                keyForCacheSendCode="forgot-password-phone"
                disabledSendCodeButton={
                  !cellPhoneFormik.values.phoneNumber ||
                  !!cellPhoneFormik.errors.phoneNumber
                }
              />
              <PasswordInput
                value={cellPhoneFormik.values.password}
                onChangeText={(text) =>
                  cellPhoneFormik.setFieldValue("password", text)
                }
                onBlur={cellPhoneFormik.handleBlur("password")}
                error={
                  cellPhoneFormik.touched.password
                    ? cellPhoneFormik.errors.password
                    : undefined
                }
              />
              <PasswordInput
                value={cellPhoneFormik.values.confirmPassword}
                onChangeText={(text) =>
                  cellPhoneFormik.setFieldValue("confirmPassword", text)
                }
                onBlur={cellPhoneFormik.handleBlur("confirmPassword")}
                error={
                  cellPhoneFormik.touched.confirmPassword
                    ? cellPhoneFormik.errors.confirmPassword
                    : undefined
                }
              />
            </div>
          )}

          {activeTab === "email" && (
            <div className="mt-6 flex flex-col gap-5">
              <AppTextInput
                value={emailFormik.values.email}
                onChangeText={(text) =>
                  emailFormik.setFieldValue("email", text)
                }
                onBlur={emailFormik.handleBlur("email")}
                error={
                  emailFormik.touched.email
                    ? emailFormik.errors.email
                    : undefined
                }
                placeholder={t("auth.enterEmail")}
                type="email"
              />
              <VerificationCodeInput
                value={emailFormik.values.emailValidationCode}
                onChangeText={(text) =>
                  emailFormik.setFieldValue("emailValidationCode", text)
                }
                onBlur={emailFormik.handleBlur("emailValidationCode")}
                error={
                  emailFormik.touched.emailValidationCode
                    ? emailFormik.errors.emailValidationCode
                    : undefined
                }
                onSendCode={onSendEmailCode}
                disabledSendCodeButton={
                  !emailFormik.values.email || !!emailFormik.errors.email
                }
                keyForCacheSendCode="forgot-password-email"
              />
              <PasswordInput
                value={emailFormik.values.password}
                onChangeText={(text) =>
                  emailFormik.setFieldValue("password", text)
                }
                onBlur={emailFormik.handleBlur("password")}
                error={
                  emailFormik.touched.password
                    ? emailFormik.errors.password
                    : undefined
                }
              />
              <PasswordInput
                value={emailFormik.values.confirmPassword}
                onChangeText={(text) =>
                  emailFormik.setFieldValue("confirmPassword", text)
                }
                onBlur={emailFormik.handleBlur("confirmPassword")}
                error={
                  emailFormik.touched.confirmPassword
                    ? emailFormik.errors.confirmPassword
                    : undefined
                }
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-7 pb-10">
        <AuthButton
          className="mt-10"
          onClick={onClickResetPassword}
          disabled={isSubmitting || disabled}
        >
          {t("auth.resetPassword")}
        </AuthButton>
      </div>
    </div>
  );
};

export default ForgotPassword;
