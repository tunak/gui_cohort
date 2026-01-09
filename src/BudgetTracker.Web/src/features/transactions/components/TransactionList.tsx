import { useSearchParams, useNavigation } from 'react-router-dom';
import type { Transaction, PaginatedResponse } from '../types';
import EmptyState from '../../../shared/components/EmptyState';
import Pagination from '../../../shared/components/Pagination';
import { SkeletonCardRow } from '../../../shared/components/Skeleton';
import { formatCurrency, formatAmount, formatDate } from '../../../shared/utils/formatters';

interface TransactionListProps {
  data: PaginatedResponse<Transaction>;
}

export function TransactionList({ data }: TransactionListProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCardRow key={i} />
        ))}
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <EmptyState
        title="No transactions yet"
        description="Import your first transaction file to get started tracking your finances."
        action={{
          label: 'Import Transactions',
          onClick: () => {
            // TODO: Navigate to import page or open import modal
            console.log('Import transactions clicked');
          },
        }}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Transaction Cards */}
      <div className="space-y-3">
        {data.items.map((transaction) => (
          <div
            key={transaction.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              {/* Left side: Date, Description, Account */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <time className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {formatDate(transaction.date)}
                  </time>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                    {transaction.account}
                  </span>
                </div>
                <p className="text-base font-medium text-gray-900 dark:text-white truncate">
                  {transaction.description}
                </p>
                {transaction.category && (
                  <div className="mt-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                      {transaction.category}
                    </span>
                  </div>
                )}
                {transaction.labels && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {transaction.labels}
                  </p>
                )}
              </div>

              {/* Right side: Amount and Balance */}
              <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-1">
                <div
                  className={`text-lg font-semibold ${
                    transaction.amount >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {formatAmount(transaction.amount)}
                </div>
                {transaction.balance !== null && (
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Balance: {formatCurrency(transaction.balance)}
                  </div>
                )}
              </div>
            </div>

            {/* Footer: Import info */}
            <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Imported {formatDate(transaction.importedAt)}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {data.totalPages > 1 && (
        <Pagination
          currentPage={data.page}
          totalPages={data.totalPages}
          totalCount={data.totalCount}
          pageSize={data.pageSize}
        />
      )}
    </div>
  );
}
