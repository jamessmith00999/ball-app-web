/**
 * Better Auth Error Code to Translation Key Mapping
 * Maps all better-auth error codes to i18n translation keys for multi-language support
 */
export const betterAuthErrorMap: Record<string, string> = {
  // Authentication errors
  INVALID_EMAIL_OR_PASSWORD: "auth.errors.invalidCredentials",
  USER_NOT_FOUND: "auth.errors.userNotFound",
  INVALID_PASSWORD: "auth.errors.invalidPassword",
  EMAIL_ALREADY_EXISTS: "auth.errors.emailAlreadyExists",
  EMAIL_ALREADY_USED: "auth.errors.emailAlreadyExists",
  INVALID_EMAIL: "auth.errors.invalidEmail",
  WEAK_PASSWORD: "auth.errors.weakPassword",
  PHONE_NUMBER_ALREADY_EXISTS: "auth.errors.phoneNumberAlreadyExists",
  INVALID_PHONE_NUMBER: "auth.errors.invalidPhoneNumber",

  // Session errors
  SESSION_EXPIRED: "auth.errors.sessionExpired",
  UNAUTHORIZED: "auth.errors.unauthorized",
  SESSION_NOT_FOUND: "auth.errors.sessionNotFound",

  // OTP errors
  INVALID_OTP: "auth.errors.invalidOtp",
  OTP_EXPIRED: "auth.errors.otpExpired",
  OTP_NOT_FOUND: "auth.errors.otpNotFound",
  TOO_MANY_REQUESTS: "auth.errors.tooManyRequests",

  // Token errors
  INVALID_TOKEN: "auth.errors.invalidToken",
  TOKEN_EXPIRED: "auth.errors.tokenExpired",
  TOKEN_NOT_FOUND: "auth.errors.tokenNotFound",

  // Account errors
  ACCOUNT_LOCKED: "auth.errors.accountLocked",
  ACCOUNT_NOT_VERIFIED: "auth.errors.accountNotVerified",
  EMAIL_NOT_VERIFIED: "auth.errors.emailNotVerified",
  PHONE_NUMBER_NOT_VERIFIED: "auth.errors.phoneNumberNotVerified",

  // Generic fallback
  UNKNOWN_ERROR: "auth.errors.unknown",
};

/**
 * Message-based error mapping for errors without error codes
 * Some errors only have messages, so we need to match them
 */
const errorMessageMap: Record<string, string> = {
  "Too many requests": "auth.errors.tooManyRequests",
  "Too many requests. Please try again later.": "auth.errors.tooManyRequests",
};

/**
 * Get translation key for better-auth error
 * @param errorCode - The error code from better-auth (optional)
 * @param errorMessage - The error message from better-auth (optional)
 * @returns Translation key for the error message
 */
export const getAuthErrorMessage = (
  errorCode?: string,
  errorMessage?: string,
): string => {
  // First try to match by error code
  if (errorCode && betterAuthErrorMap[errorCode]) {
    return betterAuthErrorMap[errorCode];
  }

  // If no code, try to match by message
  if (errorMessage) {
    // Check for exact match
    if (errorMessageMap[errorMessage]) {
      return errorMessageMap[errorMessage];
    }

    // Check for partial match (case-insensitive)
    const lowerMessage = errorMessage.toLowerCase();
    for (const [key, value] of Object.entries(errorMessageMap)) {
      if (lowerMessage.includes(key.toLowerCase())) {
        return value;
      }
    }
  }

  // Fallback to unknown error
  return "auth.errors.unknown";
};
