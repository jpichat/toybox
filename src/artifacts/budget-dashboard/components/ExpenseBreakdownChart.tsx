import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface ExpenseBreakdownChartProps {
  transactions: Transaction[];
}

const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({ transactions }) => {
  const expenseData = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, transaction) => {
      const existingCategory = acc.find(item => item.category === transaction.category);
      if (existingCategory) {
        existingCategory.amount += transaction.amount;
      } else {
        acc.push({ category: transaction.category, amount: transaction.amount });
      }
      return acc;
    }, [] as { category: string; amount: number }[]);

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={expenseData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ExpenseBreakdownChart;
