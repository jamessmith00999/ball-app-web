export interface InviteCodeValidationRequest {
  inviteCode: string;
}

export interface InviterInfo {
  id: string;
  name: string;
  email: string;
}

export interface InviteCodeValidationData {
  valid: boolean;
  inviteCode: string;
  message: string;
  inviter?: InviterInfo;
}
