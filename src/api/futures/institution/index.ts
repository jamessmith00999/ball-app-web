import { futuresApi } from "@/api/futures/futures-api";

import type {
  EntityQualificationRequest,
  EntityRegistrationRequest,
  FinancialAuditReportRequest,
  InstitutionLogsResponse,
  InstitutionPreviewResponse,
  ProductProspectusRequest,
  SettlementInformationRequest,
  TeamInformationRequest,
} from "./types";

export * from "./types";

export async function getInstitutionPreview(): Promise<InstitutionPreviewResponse> {
  const response = await futuresApi.get<InstitutionPreviewResponse>(
    "/api/v1/exchange/institution/preview",
  );
  return response.data;
}

export async function submitInstitution() {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/submit",
    {},
  );
  return response.data;
}

export async function registerInstitutionEntity(
  request: EntityRegistrationRequest,
) {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/entity-registration",
    request,
  );
  return response.data;
}

export async function registerEntityQualification(
  request: EntityQualificationRequest,
) {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/entity-qualification",
    request,
  );
  return response.data;
}

export async function registerFinancialAuditReport(
  request: FinancialAuditReportRequest,
) {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/financial-audit-report",
    request,
  );
  return response.data;
}

export async function registerProductProspectus(
  request: ProductProspectusRequest,
) {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/product-prospectus",
    request,
  );
  return response.data;
}

export async function registerTeamInformation(request: TeamInformationRequest) {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/team-information",
    request,
  );
  return response.data;
}

export async function registerSettlementInformation(
  request: SettlementInformationRequest,
) {
  const response = await futuresApi.post(
    "/api/v1/exchange/institution/settlement-information",
    request,
  );
  return response.data;
}

export async function getInstitutionLogs(
  uid: string,
): Promise<InstitutionLogsResponse> {
  const response = await futuresApi.get<InstitutionLogsResponse>(
    `/api/v1/exchange/institution/institution-log/${uid}`,
  );
  return response.data;
}
