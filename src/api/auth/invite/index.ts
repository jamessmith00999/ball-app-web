import authApi from "@/api/auth/auth-api";

import type {
  InviteCodeValidationData,
  InviteCodeValidationRequest,
} from "./types";

export * from "./types";

/**
 * Validates an invite code
 * @param inviteCode - The invite code to validate
 * @returns Promise with validation result including inviter information
 */
export async function validateInviteCode(inviteCode: string) {
  const request: InviteCodeValidationRequest = {
    inviteCode,
  };

  const response = await authApi.post<InviteCodeValidationData>(
    "/api/auth/public/invite-code/validate",
    request,
  );

  return response.data;
}
