import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface IncomeVsExpensesChartProps {
  transactions: Transaction[];
}

const IncomeVsExpensesChart: React.FC<IncomeVsExpensesChartProps> = ({ transactions }) => {
  const data = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    let entry = acc.find(item => item.date === date);
    if (!entry) {
      entry = { date, income: 0, expense: 0 };
      acc.push(entry);
    }
    if (transaction.type === 'income') {
      entry.income += transaction.amount;
    } else {
      entry.expense += transaction.amount;
    }
    return acc;
  }, [] as { date: string; income: number; expense: number }[]).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#82ca9d" />
        <Line type="monotone" dataKey="expense" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeVsExpensesChart;
