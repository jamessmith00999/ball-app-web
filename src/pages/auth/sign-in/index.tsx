import { useFormik } from "formik";
import { useSetAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { checkUserStatus } from "@/api/futures/user";
import { BrandImg } from "@/assets/images";
import EmailInput from "@/components/auth/EmailInput";
import PasswordInput from "@/components/auth/PasswordInput";
import PhoneNumberInput from "@/components/auth/PhoneNumberInput";
import AuthButton from "@/components/ui/AuthButton";

import TabButton from "../TabButton";
import { DEFAULT_COUNTRY } from "@/constants/sports/contry-codes";
import { STORAGE_KEY } from "@/constants/storage-key";
import { alertAtom, tradeConfirmAtom } from "@/contexts/alert";
import { authClient } from "@/lib/auth-client";
import { getAuthErrorMessage } from "@/lib/auth-error-mapping";
import { storage } from "@/lib/storage";
import { formatPhoneForApi } from "@/utils/strings";
import {
  emailValidation,
  passwordValidation,
  phoneNumberValidation,
} from "@/utils/validation";

const APP_NAME = "Bestxx";

const SignIn = () => {
  const setAlert = useSetAtom(alertAtom);
  const setTradeConfirm = useSetAtom(tradeConfirmAtom);

  const [activeTab, setActiveTab] = useState<"phone" | "email">("phone");

  const { t } = useTranslation();
  const navigate = useNavigate();

  const phoneFormik = useFormik({
    initialValues: {
      country: DEFAULT_COUNTRY,
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      phoneNumber: phoneNumberValidation(t),
      password: passwordValidation(t),
    }),
    onSubmit: async (values) => {
      const phoneIdentifier = formatPhoneForApi(
        values.country.dial_code,
        values.phoneNumber
      );

      try {
        const statusResponse = await checkUserStatus({
          login_info: phoneIdentifier,
        });

        if (!statusResponse.data.is_existed) {
          setTradeConfirm({
            isVisible: true,
            title: t("auth.phoneLoginTitle"),
            description: t("auth.phoneNotRegisteredDesc"),
            descriptionPosition: "center",
            cancelButton: {
              text: t("global.cancel"),
              onClick: () => {
                setTradeConfirm((prev) => ({ ...prev, isVisible: false }));
              },
            },
            confirmButton: {
              text: t("auth.goToSignUp"),
              onClick: () => {
                setTradeConfirm((prev) => ({ ...prev, isVisible: false }));
                navigate("/auth/sign-up");
              },
            },
          });
          return;
        } else if (statusResponse.data.is_admin) {
          setAlert({
            message: t("auth.accountIsAdmin"),
            isVisible: true,
            type: "error",
          });
          return;
        } else if (statusResponse.data.is_banned) {
          setAlert({
            message: t("auth.accountBanned"),
            isVisible: true,
            type: "error",
          });
          return;
        }
      } catch (error) {
        console.error("Failed to check user status:", error);
      }

      try {
        const { data, error } = await authClient.signIn.phoneNumber({
          phoneNumber: phoneIdentifier,
          password: values.password,
        });

        if (error) {
          console.error("Sign in error:", error);
          const errorKey = getAuthErrorMessage(error.code, error.message);
          setAlert({
            message: t(errorKey),
            isVisible: true,
            type: "error",
          });
          return;
        }

        if (data) {
          storage.remove(STORAGE_KEY.SIGN_IN_EMAIL);
          storage.set(STORAGE_KEY.SIGN_IN_PHONE, values.phoneNumber);
          storage.set(
            STORAGE_KEY.SIGN_IN_COUNTRY_DIAL_CODE,
            values.country.dial_code
          );

          navigate("/");
        }
      } catch (error) {
        console.error("Sign in exception:", error);
        setAlert({
          message: t("auth.errors.unknown"),
          isVisible: true,
          type: "error",
        });
      }
    },
  });

  const emailFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: emailValidation(t),
      password: passwordValidation(t),
    }),
    onSubmit: async (values) => {
      try {
        const statusResponse = await checkUserStatus({
          login_info: values.email,
        });

        if (!statusResponse.data.is_existed) {
          setTradeConfirm({
            isVisible: true,
            title: t("auth.emailLoginTitle"),
            description: t("auth.emailNotRegisteredDesc"),
            descriptionPosition: "center",
            cancelButton: {
              text: t("global.cancel"),
              onClick: () => {
                setTradeConfirm((prev) => ({ ...prev, isVisible: false }));
              },
            },
            confirmButton: {
              text: t("auth.goToSignUp"),
              onClick: () => {
                setTradeConfirm((prev) => ({ ...prev, isVisible: false }));
                navigate("/auth/sign-up");
              },
            },
          });
          return;
        } else if (statusResponse.data.is_admin) {
          setAlert({
            message: t("auth.accountIsAdmin"),
            isVisible: true,
            type: "error",
          });
          return;
        } else if (statusResponse.data.is_banned) {
          setAlert({
            message: t("auth.accountBanned"),
            isVisible: true,
            type: "error",
          });
          return;
        }
      } catch (error) {
        console.error("Failed to check user status:", error);
      }

      try {
        const { data, error } = await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });

        if (error) {
          console.error("Sign in error:", error);
          const errorKey = getAuthErrorMessage(error.code, error.message);
          setAlert({
            message: t(errorKey),
            isVisible: true,
            type: "error",
          });
          return;
        }

        if (data) {
          storage.remove(STORAGE_KEY.SIGN_IN_PHONE);
          storage.remove(STORAGE_KEY.SIGN_IN_COUNTRY_DIAL_CODE);
          storage.set(STORAGE_KEY.SIGN_IN_EMAIL, values.email);

          navigate("/");
        }
      } catch (error) {
        console.error("Sign in exception:", error);
        setAlert({
          message: t("auth.errors.unknown"),
          isVisible: true,
          type: "error",
        });
      }
    },
  });

  useEffect(() => {
    (async function () {
      if (activeTab === "email") {
        const email = storage.get(STORAGE_KEY.SIGN_IN_EMAIL);
        emailFormik.setFieldValue("email", email || "");
        emailFormik.setFieldValue("password", "");
      } else {
        const phone = storage.get(STORAGE_KEY.SIGN_IN_PHONE);
        phoneFormik.setFieldValue("country", DEFAULT_COUNTRY);
        phoneFormik.setFieldValue("phoneNumber", phone || "");
        phoneFormik.setFieldValue("password", "");
      }
    })();
  }, [activeTab]);

  const contentArea = useMemo(() => {
    if (activeTab === "phone") {
      return (
        <div>
          <div className="flex flex-col gap-5">
            <PhoneNumberInput
              country={phoneFormik.values.country}
              onCountryChange={(country) =>
                phoneFormik.setFieldValue("country", country)
              }
              value={phoneFormik.values.phoneNumber}
              onChangeText={(text) =>
                phoneFormik.setFieldValue("phoneNumber", text)
              }
              onBlur={phoneFormik.handleBlur("phoneNumber")}
              error={
                phoneFormik.touched.phoneNumber
                  ? phoneFormik.errors.phoneNumber
                  : undefined
              }
            />
            <PasswordInput
              value={phoneFormik.values.password}
              onChangeText={(text) =>
                phoneFormik.setFieldValue("password", text)
              }
              onBlur={phoneFormik.handleBlur("password")}
              error={
                phoneFormik.touched.password
                  ? phoneFormik.errors.password
                  : undefined
              }
            />
          </div>

          <div>
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="mt-3 mb-7 text-text-tertiary text-sm hover:opacity-80 transition-opacity"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <AuthButton
              disabled={
                !phoneFormik.isValid ||
                !phoneFormik.values.phoneNumber ||
                !phoneFormik.values.password ||
                phoneFormik.isSubmitting
              }
              onClick={() => phoneFormik.handleSubmit()}
            >
              {t("auth.signIn")}
            </AuthButton>
          </div>
        </div>
      );
    } else if (activeTab === "email") {
      return (
        <div>
          <div className="flex flex-col gap-5">
            <EmailInput
              value={emailFormik.values.email}
              onChangeText={(text) => emailFormik.setFieldValue("email", text)}
              onBlur={emailFormik.handleBlur("email")}
              error={
                emailFormik.touched.email ? emailFormik.errors.email : undefined
              }
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
          </div>

          <div>
            <div className="flex justify-end">
              <Link
                to="/auth/forgot-password"
                className="mt-3 mb-7 text-text-tertiary text-sm hover:opacity-80 transition-opacity"
              >
                {t("auth.forgotPassword")}
              </Link>
            </div>
            <AuthButton
              disabled={
                !emailFormik.isValid ||
                !emailFormik.values.email ||
                !emailFormik.values.password ||
                emailFormik.isSubmitting
              }
              onClick={() => emailFormik.handleSubmit()}
            >
              {t("auth.signIn")}
            </AuthButton>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }, [activeTab, phoneFormik, emailFormik, t, navigate]);

  return (
    <div className="min-h-screen bg-app-background flex flex-col">
      <div className="flex-1 px-5">
        <div className="my-[15px]">
          <img src={BrandImg} alt="Brand" className="w-[123px] h-[40px]" />
        </div>
        <div className="py-4">
          <h1 className="text-white text-[24px] font-bold">
            {t("auth.appNameLogin", { appName: APP_NAME })}
          </h1>
        </div>
        {/* sign in tabs */}
        <div className="flex gap-8 mt-2 mb-6">
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
        {contentArea}
        <div className="flex justify-center mt-4">
          <span className="text-text-tertiary text-sm mr-1">
            {t("auth.dontHaveAccount")}
          </span>
          <Link
            to="/auth/sign-up"
            className="text-tints-2 text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            {t("auth.goToSignUp")}
          </Link>
        </div>
      </div>

      {/* Bottom terms */}
      <div className="flex flex-wrap justify-center gap-[2px] my-5 px-10">
        <span className="text-xs text-text-tips">
          {t("auth.registrationAgreement")}
        </span>
        <button
          type="button"
          className="text-xs text-tints-2 hover:opacity-80 transition-opacity"
        >
          {t("auth.termsAndConditions")}
        </button>
        <span className="text-xs text-text-tips">{t("auth.and")}</span>
        <button
          type="button"
          className="text-xs text-tints-2 hover:opacity-80 transition-opacity"
        >
          {t("auth.privacyPolicy")}
        </button>
      </div>
    </div>
  );
};

export default SignIn;
