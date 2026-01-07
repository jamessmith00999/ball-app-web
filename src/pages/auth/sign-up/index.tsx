import { useFormik } from "formik";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { validateInviteCode } from "@/api/auth/invite";
import { checkUserStatus } from "@/api/futures/user";
import AppTextInput from "@/components/auth/AppTextInput";
import PasswordInput from "@/components/auth/PasswordInput";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import VerificationCodeInput from "@/components/auth/VerificationCodeInput";
import AppHeader from "@/components/ui/AppHeader";
import AuthButton from "@/components/ui/AuthButton";
import TabButton from "../TabButton";
import { DEFAULT_COUNTRY } from "@/constants/sports/contry-codes";
import { STORAGE_KEY } from "@/constants/storage-key";
import { alertAtom } from "@/contexts/alert";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-error-mapping";
import { storage } from "@/lib/storage";
import { formatPhoneForApi } from "@/utils/strings";
import {
  confirmPasswordValidation,
  emailValidation,
  emailValidationCodeValidation,
  inviteCodeValidation,
  passwordValidation,
  phoneNumberCodeValidation,
  phoneNumberValidation,
} from "@/utils/validation";

const SignUp = () => {
  const navigate = useNavigate();
  const setAlert = useSetAtom(alertAtom);
  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");
  const { t } = useTranslation();

  const cellPhoneFormik = useFormik({
    initialValues: {
      country: DEFAULT_COUNTRY,
      phoneNumber: "",
      phoneValidationCode: "",
      password: "",
      confirmPassword: "",
      inviteCode: "",
    },
    validationSchema: Yup.object({
      phoneNumber: phoneNumberValidation(t),
      password: passwordValidation(t),
      phoneValidationCode: phoneNumberCodeValidation(t),
      confirmPassword: confirmPasswordValidation(t),
      inviteCode: inviteCodeValidation(t),
    }),
    onSubmit: () => {},
  });

  const emailFormik = useFormik({
    initialValues: {
      email: "",
      emailValidationCode: "",
      password: "",
      confirmPassword: "",
      inviteCode: "",
    },
    validationSchema: Yup.object({
      email: emailValidation(t),
      emailValidationCode: emailValidationCodeValidation(t),
      password: passwordValidation(t),
      confirmPassword: confirmPasswordValidation(t),
      inviteCode: inviteCodeValidation(t),
    }),
    onSubmit: () => {},
  });

  const disabled = useMemo(() => {
    if (activeTab === "phone") {
      return (
        !cellPhoneFormik.values.phoneNumber ||
        !cellPhoneFormik.values.password ||
        !cellPhoneFormik.values.confirmPassword ||
        !cellPhoneFormik.values.phoneValidationCode ||
        !cellPhoneFormik.values.inviteCode ||
        !cellPhoneFormik.isValid
      );
    } else {
      return (
        !emailFormik.values.email ||
        !emailFormik.values.password ||
        !emailFormik.values.confirmPassword ||
        !emailFormik.values.emailValidationCode ||
        !emailFormik.values.inviteCode ||
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

  useEffect(() => {
    cellPhoneFormik.resetForm();
    emailFormik.resetForm();
  }, [activeTab]);

  const onSendPhoneCode = async () => {
    try {
      const phoneIdentifier = formatPhoneForApi(
        cellPhoneFormik.values.country.dial_code,
        cellPhoneFormik.values.phoneNumber
      );

      const statusResponse = await checkUserStatus({
        login_info: phoneIdentifier,
      });

      if (statusResponse.data.is_existed) {
        return {
          success: false,
          message: t("modal.phoneAlreadyRegistered"),
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

      // Send phone OTP
      const response = await authClient.phoneNumber.sendOtp({
        phoneNumber: phoneIdentifier,
      });

      if (response.error) {
        const errorKey = getAuthErrorMessage(
          response.error.code,
          response.error.message
        );
        return {
          success: false,
          message: t(errorKey),
        };
      } else {
        return {
          success: true,
        };
      }
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

      if (statusResponse.data.is_existed) {
        return {
          success: false,
          message: t("modal.emailAlreadyRegistered"),
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

      const response = await authClient.emailOtp.sendVerificationOtp({
        email: emailFormik.values.email,
        type: "sign-in",
      });

      if (response.error) {
        const errorKey = getAuthErrorMessage(
          response.error.code,
          response.error.message
        );
        return {
          success: false,
          message: t(errorKey),
        };
      } else {
        return {
          success: true,
        };
      }
    } catch (error) {
      console.error({ error });
      return {
        success: false,
        message: t("auth.errors.unknown"),
      };
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onClickSignUp = async () => {
    const invitationCode =
      activeTab === "phone"
        ? cellPhoneFormik.values.inviteCode
        : emailFormik.values.inviteCode;

    try {
      const validationResult = await validateInviteCode(invitationCode);

      if (!validationResult.valid) {
        setAlert({
          message: validationResult.message || t("modal.invalidInviteCode"),
          isVisible: true,
          type: "error",
        });
        return;
      }
    } catch (error) {
      setAlert({
        message: t("modal.invalidInviteCode"),
        isVisible: true,
        type: "error",
      });
      console.error(error);
      return;
    }

    if (activeTab === "phone") {
      try {
        setIsSubmitting(true);
        const phoneIdentifier =
          cellPhoneFormik.values.country.dial_code +
          cellPhoneFormik.values.phoneNumber;

        // Verify phone number OTP code
        const response = await authClient.phoneNumber.verify({
          phoneNumber: phoneIdentifier,
          code: cellPhoneFormik.values.phoneValidationCode,
          password: cellPhoneFormik.values.password,
          inviteCode: invitationCode,
        } as any);

        if (response.error) {
          const errorKey = getAuthErrorMessage(
            response.error.code,
            response.error.message
          );
          setAlert({
            message: t(errorKey),
            isVisible: true,
            type: "error",
          });
          return;
        } else {
          storage.remove(STORAGE_KEY.SIGN_IN_EMAIL);
          storage.set(
            STORAGE_KEY.SIGN_IN_PHONE,
            cellPhoneFormik.values.phoneNumber
          );
          storage.set(
            STORAGE_KEY.SIGN_IN_COUNTRY_DIAL_CODE,
            cellPhoneFormik.values.country.dial_code
          );

          navigate("/");
        }
      } catch (error) {
        console.error("Sign up exception:", error);
        setAlert({
          message: t("auth.errors.unknown"),
          isVisible: true,
          type: "error",
        });
        return;
      } finally {
        setIsSubmitting(false);
      }
    } else if (activeTab === "email") {
      try {
        setIsSubmitting(true);

        const response = await authClient.signIn.emailOtp({
          email: emailFormik.values.email,
          otp: emailFormik.values.emailValidationCode,
          password: emailFormik.values.password,
          inviteCode: invitationCode,
        } as any);

        if (response.error) {
          const errorKey = getAuthErrorMessage(
            response.error.code,
            response.error.message
          );
          setAlert({
            message: t(errorKey),
            isVisible: true,
            type: "error",
          });
          return;
        } else {
          storage.remove(STORAGE_KEY.SIGN_IN_PHONE);
          storage.remove(STORAGE_KEY.SIGN_IN_COUNTRY_DIAL_CODE);
          storage.set(STORAGE_KEY.SIGN_IN_EMAIL, emailFormik.values.email);
          navigate("/");
        }
      } catch (error) {
        console.error("Sign up exception:", error);
        setAlert({
          message: t("auth.errors.unknown"),
          isVisible: true,
          type: "error",
        });
        return;
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      <AppHeader>{t("auth.registration")}</AppHeader>

      <div className="flex-1 overflow-y-auto">
        <div className="px-3 py-4">
          {/* sign up tabs */}
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

          {/* sign up content */}
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
                disabledSendCodeButton={
                  !cellPhoneFormik.values.phoneNumber ||
                  !!cellPhoneFormik.errors.phoneNumber
                }
                onSendCode={onSendPhoneCode}
                keyForCacheSendCode="sign-up-phone"
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
              <AppTextInput
                value={cellPhoneFormik.values.inviteCode}
                onChangeText={(text) =>
                  cellPhoneFormik.setFieldValue("inviteCode", text)
                }
                onBlur={cellPhoneFormik.handleBlur("inviteCode")}
                error={
                  cellPhoneFormik.touched.inviteCode
                    ? cellPhoneFormik.errors.inviteCode
                    : undefined
                }
                placeholder={t("auth.inviteCode")}
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
                keyForCacheSendCode="sign-up-email"
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
              <AppTextInput
                value={emailFormik.values.inviteCode}
                onChangeText={(text) =>
                  emailFormik.setFieldValue("inviteCode", text)
                }
                onBlur={emailFormik.handleBlur("inviteCode")}
                error={
                  emailFormik.touched.inviteCode
                    ? emailFormik.errors.inviteCode
                    : undefined
                }
                placeholder={t("auth.inviteCode")}
              />
            </div>
          )}
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-7 pb-10 pt-5 bg-app-background">
        <Terms />
        <AuthButton
          className="mt-10"
          onClick={onClickSignUp}
          disabled={isSubmitting || disabled}
        >
          {t("auth.signUp")}
        </AuthButton>
      </div>
    </div>
  );
};

const Terms = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1 items-center">
      <span className="text-theme-gray-3 text-sm">
        {t("auth.loginRepresentsYourConsent")}
      </span>
      <div className="flex">
        <button
          type="button"
          className="text-white text-sm font-semibold border-b border-white hover:opacity-80 transition-opacity"
        >
          {t("auth.termsAndConditions")}
        </button>
        <span className="text-theme-gray-3 text-sm font-semibold">
          {t("auth.and")}
        </span>
        <button
          type="button"
          className="text-white text-sm font-semibold border-b border-white hover:opacity-80 transition-opacity"
        >
          {t("auth.privacyPolicy")}
        </button>
      </div>
    </div>
  );
};

export default SignUp;
