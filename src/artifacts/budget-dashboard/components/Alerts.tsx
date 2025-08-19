import React, { useState } from 'react';

interface Metrics {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
}

interface AlertsProps {
  metrics: Metrics;
  expenseThreshold: number;
  savingsThreshold: number;
  onSetExpenseThreshold: (threshold: number) => void;
  onSetSavingsThreshold: (threshold: number) => void;
}

const Alerts: React.FC<AlertsProps> = ({
  metrics,
  expenseThreshold,
  savingsThreshold,
  onSetExpenseThreshold,
  onSetSavingsThreshold,
}) => {
  const [newExpenseThreshold, setNewExpenseThreshold] = useState(expenseThreshold.toString());
  const [newSavingsThreshold, setNewSavingsThreshold] = useState(savingsThreshold.toString());

  const handleSetExpenseThreshold = () => {
    const value = parseFloat(newExpenseThreshold);
    if (!isNaN(value)) {
      onSetExpenseThreshold(value);
    }
  };

  const handleSetSavingsThreshold = () => {
    const value = parseFloat(newSavingsThreshold);
    if (!isNaN(value)) {
      onSetSavingsThreshold(value);
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Alerts & Thresholds</h3>
      <ul className="list-disc pl-5 mb-4">
        {metrics.totalExpenses > expenseThreshold && expenseThreshold > 0 && (
          <li className="text-red-600">
            <strong>Alert:</strong> Your total expenses (${metrics.totalExpenses.toFixed(2)}) have exceeded your set threshold (${expenseThreshold.toFixed(2)}).
          </li>
        )}
        {metrics.savings < savingsThreshold && savingsThreshold > 0 && (
          <li className="text-red-600">
            <strong>Alert:</strong> Your savings (${metrics.savings.toFixed(2)}) have fallen below your set threshold (${savingsThreshold.toFixed(2)}).
          </li>
        )}
        {metrics.totalExpenses <= expenseThreshold && (expenseThreshold > 0 || savingsThreshold > 0) && metrics.savings >= savingsThreshold && (
          <li className="text-green-600">
            All good! Your budget is within the set thresholds.
          </li>
        )}
        {(expenseThreshold === 0 && savingsThreshold === 0) && (
          <li className="text-yellow-600">
            No thresholds set. Set thresholds below to receive alerts.
          </li>
        )}
      </ul>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="expense-threshold" className="block text-sm font-medium text-gray-700">Set Expense Threshold</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              id="expense-threshold"
              value={newExpenseThreshold}
              onChange={(e) => setNewExpenseThreshold(e.target.value)}
              placeholder="e.g. 2000"
              className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleSetExpenseThreshold}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              Set
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="savings-threshold" className="block text-sm font-medium text-gray-700">Set Savings Threshold</label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              type="number"
              id="savings-threshold"
              value={newSavingsThreshold}
              onChange={(e) => setNewSavingsThreshold(e.target.value)}
              placeholder="e.g. 500"
              className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button
              type="button"
              onClick={handleSetSavingsThreshold}
              className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
