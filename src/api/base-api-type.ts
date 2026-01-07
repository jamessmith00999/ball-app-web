export interface ApiResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}

export interface BaseModal {
  id: number;
  uid: string;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export interface Pagination<T> {
  data: T[];
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
}

export type Translation = Record<string, string>;
