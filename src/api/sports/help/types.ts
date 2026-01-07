import type { ApiResponse } from "@/api/base-api-type";

export interface HelpItem {
  id: number;
  title?: string;
  details: string;
  category: string;
  date_created: string;
  date_updated: string | null;
  status: "published" | "draft" | "archived";
  sort: number | null;
  name?: string;
  isRead: boolean;
  is_read: boolean;
}

export interface HelpData {
  about_us: HelpItem[];
  faq: HelpItem[];
  game_rules: HelpItem[];
  privacy: HelpItem[];
  support_team: {
    telegram: string;
  }[];
  term: HelpItem[];
}

export type GetPublicHelpResponse = ApiResponse<HelpData>;
