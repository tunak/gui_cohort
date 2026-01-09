import { apiClient } from '../../api';
import type { Transaction, PaginatedResponse, TransactionsParams, ImportRequest, ImportResult } from './types';

export type { ImportResult };

export const transactionsApi = {
  async getTransactions(params: TransactionsParams = {}): Promise<PaginatedResponse<Transaction>> {
    const { page = 1, pageSize = 20 } = params;
    const response = await apiClient.get<PaginatedResponse<Transaction>>('/transactions', {
      params: { page, pageSize },
    });
    return response.data;
  },

  async importTransactions(request: ImportRequest): Promise<ImportResult> {
    // First, get the XSRF token
    await apiClient.get('/antiforgery/token');

    const formData = new FormData();
    formData.append('file', request.file);
    formData.append('account', request.account);

    const response = await apiClient.post<ImportResult>('/transactions/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: request.onUploadProgress,
    });

    return response.data;
  },
};
