import { futuresApi } from "@/api/futures/futures-api";

import type {
  GetDocumentUrlRequest,
  GetDocumentUrlResponse,
  UploadDocumentRequest,
  UploadDocumentResponse,
  UserInfoResponse,
  UserLevelsResponse,
  UserPnlResponse,
  UserStatusCheckRequest,
  UserStatusCheckResponse,
} from "./types";

export * from "./types";

export async function checkUserStatus(
  request: UserStatusCheckRequest,
): Promise<UserStatusCheckResponse> {
  const response = await futuresApi.get<UserStatusCheckResponse>(
    "/api/v1/user/public/user-status-check",
    {
      params: request,
    },
  );
  return response.data;
}

export async function getUserInfo(): Promise<UserInfoResponse> {
  const response = await futuresApi.get<UserInfoResponse>("/api/v1/user/info");
  return response.data;
}

export async function getUserPnl(): Promise<UserPnlResponse> {
  const response = await futuresApi.get<UserPnlResponse>("/api/v1/user/pnl");
  return response.data;
}

export async function getPublicLevels(): Promise<UserLevelsResponse> {
  const response = await futuresApi.get<UserLevelsResponse>(
    "/api/v1/user/public/levels",
  );
  return response.data;
}

export async function getDocumentUrl(
  data: GetDocumentUrlRequest,
): Promise<GetDocumentUrlResponse> {
  const response = await futuresApi.post<GetDocumentUrlResponse>(
    "/api/v1/user/document/get-document-url",
    data,
  );
  return response.data;
}

export async function uploadDocument(
  data: UploadDocumentRequest,
): Promise<UploadDocumentResponse> {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("folder_name", data.folder_name);
  formData.append("file_name", data.file_name);

  const response = await futuresApi.post<UploadDocumentResponse>(
    "/api/v1/user/document/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export async function updateTrialCreditPageShowed() {
  const response = await futuresApi.post(
    "/api/v1/user/trial-credit-page-showed",
  );
  return response.data;
}
