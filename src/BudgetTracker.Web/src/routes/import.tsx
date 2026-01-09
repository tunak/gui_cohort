import Header from '../shared/components/layout/Header';
import FileUpload from '../features/transactions/components/FileUpload';

export default function Import() {
  return (
    <div className="px-4 py-6 sm:px-0">
      <Header
        title="Import Transactions"
        subtitle="Upload your bank statement CSV file to import transactions"
      />

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <FileUpload />
      </div>
    </div>
  );
}