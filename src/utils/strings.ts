export function uppercaseFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Format phone number for backend API
 * Backend requires format: "area_code phone_number" (with space)
 * Example: "+1 1234567890"
 */
export function formatPhoneForApi(dialCode: string, phoneNumber: string) {
  return `${dialCode} ${phoneNumber}`;
}
