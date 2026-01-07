import type { ApiResponse, BaseModal } from "@/api/base-api-type";

export interface InstitutionPreviewData extends BaseModal {
  user_clerk_id: string;
  status: string;
  entity_name: string;
  registration_certificate_type: string;
  registration_certificate_number: string;
  registration_certificate_url: string;
  registration_address: string;
  business_scope: string;
  contact_information: string;
  entity_qualification_certificate_url: string;
  valid_date_from: number | null;
  valid_date_to: number | null;
  financial_audit_report_url: string;
  finalcial_proof_of_funds_url: string;
  product_prospectus_url: string;
  historical_performance_report_url: string;
  team_core_member_name: string;
  team_core_member_cert_type: string;
  team_core_member_cert_number: string;
  team_core_member_professional_qualification_cert_url: string;
  team_core_member_email: string;
  team_organization_chart_url: string;
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_swift_code: string;
  reviewed_at: number | null;
  reviewed_by: string;
  review_comments: string;
  rejection_reason: string;
  submitted_at: number | null;
  approved_at: number | null;
  pledged_amount: string;
}

export type InstitutionPreviewResponse = ApiResponse<InstitutionPreviewData>;

export interface EntityRegistrationRequest {
  entity_name: string;
  registration_certificate_type: string;
  registration_certificate_number: string;
  registration_address: string;
  registration_certificate_url: string;
  business_scope: string;
  contact_information: string;
}

export interface EntityQualificationRequest {
  entity_qualification_certificate_url: string;
  valid_date_from: number;
  valid_date_to: number;
}

export interface FinancialAuditReportRequest {
  financial_audit_report_url: string;
  finalcial_proof_of_funds_url: string;
}

export interface ProductProspectusRequest {
  product_prospectus_url: string;
  historical_performance_report_url?: string;
}

export interface TeamInformationRequest {
  team_core_member_name: string;
  team_core_member_cert_type: string;
  team_core_member_cert_number: string;
  team_core_member_professional_qualification_cert_url: string;
  team_core_member_email: string;
  team_organization_chart_url: string;
}

export interface SettlementInformationRequest {
  bank_account_name: string;
  bank_account_number: string;
  bank_name: string;
  bank_swift_code: string;
}

export type InstitutionLogAction =
  | "created"
  | "submitted"
  | "approved"
  | "rejected"
  | "suspended"
  | "deposit_paid";
export type InstitutionLogStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "suspended";
export interface InstitutionLogData extends BaseModal {
  institution_uid: string;
  user_id: string;
  action: InstitutionLogAction;
  old_status: InstitutionLogStatus;
  new_status: InstitutionLogStatus;
  comments: string;
  metadata: string;
  timestamp: number;
}

export type InstitutionLogsResponse = ApiResponse<InstitutionLogData[]>;
