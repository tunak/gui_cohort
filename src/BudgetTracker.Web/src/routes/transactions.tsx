import { type LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import Header from '../shared/components/layout/Header';
import { transactionsApi } from '../features/transactions/transactionsApi';
import { TransactionList } from '../features/transactions/components/TransactionList';
import type { PaginatedResponse, Transaction } from '../features/transactions/types';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const pageSize = parseInt(url.searchParams.get('pageSize') || '20', 10);

  const data = await transactionsApi.getTransactions({ page, pageSize });
  return data;
}

export default function Transactions() {
  const data = useLoaderData() as PaginatedResponse<Transaction>;

  return (
    <div className="px-4 py-6 sm:px-0">
      <Header
        title="Transactions"
        subtitle="View and manage your imported transactions"
      />

      <div className="mt-6">
        <TransactionList data={data} />
      </div>
    </div>
  );
}