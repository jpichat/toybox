import React from 'react';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface Metrics {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
}

interface InsightsProps {
  transactions: Transaction[];
  metrics: Metrics;
}

const Insights: React.FC<InsightsProps> = ({ transactions, metrics }) => {
  const largestExpenseCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      if (!acc || transaction.amount > acc.amount) {
        return transaction;
      }
      return acc;
    }, null as Transaction | null);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Insights & Actions</h3>
      <ul className="list-disc pl-5">
        {largestExpenseCategory && (
          <li>
            Your largest expense category is <strong>{largestExpenseCategory.category}</strong> with a total of <strong>${largestExpenseCategory.amount.toFixed(2)}</strong>.
          </li>
        )}
        <li>
          Your savings rate is <strong>{metrics.savingsRate.toFixed(2)}%</strong>.
          {metrics.savingsRate > 20 ? (
            <span> Great job! A savings rate above 20% is generally considered excellent.</span>
          ) : (
            <span> Consider looking for ways to increase your income or reduce your expenses to improve your savings rate.</span>
          )}
        </li>
        <li>
          <strong>Note:</strong> More advanced insights, such as comparing spending to previous months, require historical data which is not yet implemented.
        </li>
      </ul>
    </div>
  );
};

export default Insights;
