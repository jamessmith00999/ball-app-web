import type { TFunction } from "i18next";
import * as Yup from "yup";

import { isValidPassword } from "@/utils/regex";

export const emailValidation = (t: TFunction) =>
  Yup.string()
    .email(t("validation.invalidEmail"))
    .required(t("validation.emailRequired"));

export const emailValidationCodeValidation = (t: TFunction) =>
  Yup.string()
    .matches(/^\d{6}$/, t("validation.emailVerificationCodeInvalid"))
    .required(t("validation.emailVerificationCodeRequired"));

export const passwordValidation = (t: TFunction) =>
  Yup.string()
    .test(
      "password-requirements",
      t("validation.passwordRequirements"),
      (value) => !!value && isValidPassword(value)
    )
    .required(t("validation.passwordRequired"));

export const confirmPasswordValidation = (t: TFunction) =>
  Yup.string()
    .oneOf([Yup.ref("password")], t("validation.passwordMustMatch"))
    .required(t("validation.passwordRequired"));

export const phoneNumberValidation = (t: TFunction) =>
  Yup.string()
    .min(4, t("validation.phoneNumberTooShort", { count: 4 }))
    .max(15, t("validation.phoneNumberTooLong", { count: 15 }))
    .required(t("validation.phoneNumberRequired"));

export const phoneNumberCodeValidation = (t: TFunction) =>
  Yup.string()
    .matches(/^\d{6}$/, t("validation.phoneNumberVerificationCodeInvalid"))
    .required(t("validation.phoneNumberVerificationCodeRequired"));

export const inviteCodeValidation = (t: TFunction) =>
  Yup.string().required(t("validation.inviteCodeRequired"));
