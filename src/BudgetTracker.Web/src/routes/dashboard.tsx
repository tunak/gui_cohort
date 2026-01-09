import { Link } from 'react-router-dom';
import Header from '../shared/components/layout/Header';

export async function loader() {
  return {};
}

export default function Dashboard() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <Header
        title="Dashboard"
        subtitle="Welcome to your budget tracker"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions</h3>
          <p className="text-gray-600 mb-4">
            View and manage your imported transactions. Track your income and expenses.
          </p>
          <Link
            to="/transactions"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View Transactions →
          </Link>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
          <p className="text-gray-600">
            Build transaction management, analytics, and reporting features.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Code</h3>
          <p className="text-gray-600">
            Auth, styling, and project structure are already set up for you.
          </p>
        </div>
      </div>
    </div>
  );
}