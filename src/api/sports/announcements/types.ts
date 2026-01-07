import type {
  ApiResponse,
  BaseModal,
  Pagination,
  Translation,
} from "@/api/base-api-type";

export const ArticleType: Record<string, number> = {
  Announcement: 1,
  FAQ: 2,
  GameRules: 3,
  AboutUs: 4,
  SupportTeam: 5,
};

export interface Announcement extends BaseModal {
  title_translate: Translation;
  content_translate: Translation;
  type: string;
  enabled: boolean;
  sort_order: number;
  category_translate: Translation;
  is_read: boolean;
  isRead: boolean;
}

export interface GetAnnouncementsParams {
  lang: string;
  page?: number;
  page_size?: number;
}

export type GetAnnouncementsResponse = ApiResponse<Pagination<Announcement>>;
