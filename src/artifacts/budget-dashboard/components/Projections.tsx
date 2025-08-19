import React, { useState, useEffect } from 'react';

interface Metrics {
  totalIncome: number;
  totalExpenses: number;
  savings: number;
  savingsRate: number;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface ProjectionsProps {
  metrics: Metrics;
  transactions: Transaction[];
}

const Projections: React.FC<ProjectionsProps> = ({ metrics, transactions }) => {
  const [projectionMonths, setProjectionMonths] = useState(12);
  const [targetSavings, setTargetSavings] = useState('');
  const [timeToTarget, setTimeToTarget] = useState<string | null>(null);

  const averageMonthlySavings = metrics.savings;

  const projectedSavings = Array.from({ length: projectionMonths }).map((_, i) => {
    return metrics.savings + (averageMonthlySavings * (i + 1));
  });

  useEffect(() => {
    if (targetSavings && averageMonthlySavings > 0) {
      const months = parseFloat(targetSavings) / averageMonthlySavings;
      const years = Math.floor(months / 12);
      const remainingMonths = Math.round(months % 12);
      if (years > 0) {
        setTimeToTarget(`${years} years and ${remainingMonths} months`);
      } else {
        setTimeToTarget(`${remainingMonths} months`);
      }
    } else {
      setTimeToTarget(null);
    }
  }, [targetSavings, averageMonthlySavings]);

  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Financial Projections</h3>
      <div className="mb-4">
        <label htmlFor="projection-months" className="block text-sm font-medium text-gray-700">Project over (months)</label>
        <input
          type="number"
          id="projection-months"
          value={projectionMonths}
          onChange={(e) => setProjectionMonths(parseInt(e.target.value) || 0)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <h4 className="font-semibold mb-2">Projected Savings:</h4>
      <ul className="list-disc pl-5 mb-4">
        {projectedSavings.map((savings, index) => (
          <li key={index}>
            Month {index + 1}: ${savings.toFixed(2)}
          </li>
        ))}
      </ul>

      <div className="mb-4">
        <label htmlFor="target-savings" className="block text-sm font-medium text-gray-700">Target Savings Goal</label>
        <input
          type="number"
          id="target-savings"
          value={targetSavings}
          onChange={(e) => setTargetSavings(e.target.value)}
          placeholder="e.g. 10000"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {timeToTarget && (
        <p className="text-sm text-gray-600">
          Time to reach target: <strong>{timeToTarget}</strong>
        </p>
      )}
      {!timeToTarget && targetSavings && averageMonthlySavings <= 0 && (
        <p className="text-sm text-red-600">
          Cannot reach target with current savings rate.
        </p>
      )}
    </div>
  );
};

export default Projections;
