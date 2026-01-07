import sportsApi from "@/api/sports/sports-api";

import type { GetUserConfigResponse, GetUserResponse } from "./types";

export async function getUser() {
  const response = await sportsApi.get<GetUserResponse>("/api/v1/client/user");
  return response.data;
}

export async function getUserConfig() {
  const response = await sportsApi.get<GetUserConfigResponse>(
    "/api/v1/client/user-config"
  );
  return response.data;
}

export async function updateUserConfig(data: {
  soccer_goal_favor?: boolean;
  soccer_goal_bet?: boolean;
  push_with_vibration?: boolean;
  hide_bet_orders?: boolean;
}) {
  const response = await sportsApi.put("/api/v1/client/user-config", data);
  return response.data;
}

export async function updateUserEmail(data: {
  email: string;
  lang: string;
  code: string;
}) {
  const response = await sportsApi.put("/api/v1/client/user/email", data);
  return response.data;
}

export async function updateUserPhone(data: {
  phone: string;
  lang: string;
  code: string;
}) {
  const response = await sportsApi.put("/api/v1/client/user/phone", data);
  return response.data;
}

export async function updateUserPassword(data: {
  password: string;
  code: string;
}) {
  const response = await sportsApi.put("/api/v1/client/user/password", data);
  return response.data;
}

/**
 * Send verification code for changing password
 */
export async function sendChangePasswordCode(data: {
  method: "email" | "sms";
  lang: string;
}): Promise<void> {
  await sportsApi.post("/api/v1/client/send-code/change-password", data);
}

/**
 * Send verification code for changing email
 */
export async function sendChangeEmailCode(data: {
  method: "email";
  lang: string;
}): Promise<void> {
  await sportsApi.post("/api/v1/client/send-code/change-email", data);
}

/**
 * Send verification code for changing phone
 */
export async function sendChangePhoneCode(data: {
  method: "sms";
  lang: string;
}): Promise<void> {
  await sportsApi.post("/api/v1/client/send-code/change-phone", data);
}
