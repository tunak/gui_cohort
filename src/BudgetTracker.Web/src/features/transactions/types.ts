export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  balance: number | null;
  category: string | null;
  labels: string | null;
  importedAt: string;
  account: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface TransactionsParams {
  page?: number;
  pageSize?: number;
}

export interface ImportRequest {
  file: File;
  account: string;
  onUploadProgress?: (progressEvent: { loaded: number; total: number }) => void;
}

export interface ImportResult {
  totalRows: number;
  importedCount: number;
  failedCount: number;
  errors: string[];
  sourceFile: string | null;
  importSessionHash: string | null;
  importedAt: string;
}
