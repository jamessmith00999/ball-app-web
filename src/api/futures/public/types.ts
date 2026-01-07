import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export interface FaqItem extends BaseModal {
  user_clerk_id: string;
  title: string;
  title_translate: Translation;
  content: string;
  content_translate: Translation;
  language: string;
  type: string;
  Status: string;
  channel: string;
  Priority: string;
  enabled: boolean;
  published_at: number;
  read_at: string | null;
  sent_at: string | null;
  delivered_at: string | null;
  failed_at: string | null;
  error_msg: string;
  metadata: string | null;
  expires_at: string | null;
  read_count: number;
  retry_count: number;
  max_retries: number;
}

export type GetFaqListResponse = ApiResponse<Pagination<FaqItem>>;

export interface TermDocument {
  uid: string;
  link: string;
  type: "term_en" | "privacy_zht" | "term_zht" | "privacy_en";
  created_at: number;
  updated_at: number;
}

export type GetTermResponse = ApiResponse<Pagination<TermDocument>>;
