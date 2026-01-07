import type { ApiResponse, Translation } from "../../base-api-type";
import type { Match } from "../matches/types";

// Dictionary Types

export interface DictionaryItem {
  code: string;
  value: number;
  name: string;
  translate: Translation | null;
}

interface AreaDictionary {
  [key: string]: DictionaryItem;
}

interface ErrorDictionary {
  [key: string]: DictionaryItem;
}

interface NetworkDictionary {
  [key: string]: Omit<DictionaryItem, "translate">;
}

interface OrderStatusDictionary {
  [key: string]: DictionaryItem;
}

interface OrderTypeDictionary {
  [key: string]: DictionaryItem;
}

interface SportDictionary {
  [key: string]: DictionaryItem;
}

interface StatusDictionary {
  [key: string]: DictionaryItem;
}

interface AssetDictionary {
  USDC: Omit<DictionaryItem, "translate">;
  USDT: Omit<DictionaryItem, "translate">;
  NATIVE: Omit<DictionaryItem, "translate">;
  [key: string]: Omit<DictionaryItem, "translate">;
}

interface PeriodDictionary {
  [key: string]: DictionaryItem;
}

interface TxStatusDictionary {
  [key: string]: DictionaryItem;
}

interface OutcomeStatusDictionary {
  [key: string]: DictionaryItem;
}

interface ArticleTypeDictionary {
  [key: string]: DictionaryItem;
}

interface AuthCodeMethodDictionary {
  [key: string]: DictionaryItem;
}

interface MarketCategoryDictionary {
  [key: string]: DictionaryItem & {
    name_translate: Translation;
  };
}

interface PurposeDictionary {
  [key: string]: DictionaryItem;
}

interface RoleDictionary {
  [key: string]: DictionaryItem;
}

interface SettlementMethodDictionary {
  [key: string]: DictionaryItem;
}

interface SettlementResultDictionary {
  [key: string]: DictionaryItem;
}

interface TxTypeDictionary {
  [key: string]: DictionaryItem;
}

export interface DictionaryData {
  area_id: AreaDictionary;
  article_type_id: ArticleTypeDictionary;
  asset_id: AssetDictionary;
  auth_code_method_id: AuthCodeMethodDictionary;
  error_id: ErrorDictionary;
  market_category_id: MarketCategoryDictionary;
  network_id: NetworkDictionary;
  order_status_id: OrderStatusDictionary;
  order_type_id: OrderTypeDictionary;
  outcome_status_id: OutcomeStatusDictionary;
  period_id: PeriodDictionary;
  purpose_id: PurposeDictionary;
  role_id: RoleDictionary;
  settlement_method_id: SettlementMethodDictionary;
  settlement_result_id: SettlementResultDictionary;
  sport_id: SportDictionary;
  status_id: StatusDictionary;
  tx_status_id: TxStatusDictionary;
  tx_type_id: TxTypeDictionary;
}

export type GetDictResponse = ApiResponse<DictionaryData>;

// Config Types

export interface LimitationAmount {
  min_amount: number;
  max_amount: number;
  max_win_amount: number;
  currency: string;
}

export interface LimitationCategory {
  per_tx: LimitationAmount;
  daily: LimitationAmount;
}

export interface Limitation {
  order: LimitationCategory;
  withdrawal: LimitationCategory;
  deposit: LimitationCategory;
}

export interface MarketCategory {
  ids: string;
  name: string;
  name_translate: Translation;
}

export interface MainMarketsCategories {
  basketball: MarketCategory[];
  soccer: MarketCategory[];
}

export interface Carousel {
  key: string;
  name: string;
  url: string;
}

export interface Carousels {
  basketball: Carousel[];
  soccer: Carousel[];
}

export interface MarketsCategories {
  basketball: MarketCategory[];
  soccer: MarketCategory[];
}

export interface ConfigData {
  limitation: Limitation;
  main_markets_categories: MainMarketsCategories;
  markets_categories: MarketsCategories;
  version: string;
}

export type GetConfigResponse = ApiResponse<ConfigData>;

// Banner Types

export interface BannerMatch {
  id: number;
  uid: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  banner_id: number;
  match_uid: number;
  sort_order: number;
  match: Match;
}

export interface Banner {
  id: number;
  uid: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
  image_url: string;
  banner_status: "active" | "inactive";
  sort_order: number;
  banner_matches: BannerMatch[];
}

export interface BannerData {
  banner: Banner;
  current_match_id: string;
}

export type BannerListResponse = ApiResponse<BannerData[]>;
