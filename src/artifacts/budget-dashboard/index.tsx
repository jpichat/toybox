
import React, { useState, useEffect } from 'react';
import TransactionForm from './components/TransactionForm';

// --- DATA STRUCTURES ---
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


import ExpenseBreakdownChart from './components/ExpenseBreakdownChart';

import IncomeVsExpensesChart from './components/IncomeVsExpensesChart';

import TransactionsTable from './components/TransactionsTable';

import Insights from './components/Insights';

import Alerts from './components/Alerts';

import Projections from './components/Projections';

const BudgetDashboard = () => {
  // --- STATE MANAGEMENT ---
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Mock Data
    { id: '1', date: '2025-08-01', amount: 5000, category: 'Salary', type: 'income' },
    { id: '2', date: '2025-08-05', amount: 1500, category: 'Rent', type: 'expense' },
    { id: '3', date: '2025-08-10', amount: 300, category: 'Groceries', type: 'expense' },
    { id: '4', date: '2025-08-12', amount: 50, category: 'Transport', type: 'expense' },
    { id: '5', date: '2025-08-15', amount: 100, category: 'Entertainment', type: 'expense' },
  ]);

  const [metrics, setMetrics] = useState<Metrics>({
    totalIncome: 0,
    totalExpenses: 0,
    savings: 0,
    savingsRate: 0,
  });

  const [expenseThreshold, setExpenseThreshold] = useState<number>(0);
  const [savingsThreshold, setSavingsThreshold] = useState<number>(0);

  // --- CORE ENGINE ---
  useEffect(() => {
    const newMetrics: Metrics = {
      totalIncome: 0,
      totalExpenses: 0,
      savings: 0,
      savingsRate: 0,
    };

    transactions.forEach(transaction => {
      if (transaction.type === 'income') {
        newMetrics.totalIncome += transaction.amount;
      } else {
        newMetrics.totalExpenses += transaction.amount;
      }
    });

    newMetrics.savings = newMetrics.totalIncome - newMetrics.totalExpenses;
    newMetrics.savingsRate = newMetrics.totalIncome > 0 ? (newMetrics.savings / newMetrics.totalIncome) * 100 : 0;

    setMetrics(newMetrics);
  }, [transactions]);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: new Date().toISOString(), // simple unique id
    };
    setTransactions([...transactions, newTransaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Budget Dashboard</h1>

      {/* Input Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Data Input</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TransactionForm onAddTransaction={addTransaction} type="income" />
          <TransactionForm onAddTransaction={addTransaction} type="expense" />
        </div>
      </div>

      {/* Metrics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Key Metrics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold">Total Income</h3>
            <p>${metrics.totalIncome.toFixed(2)}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold">Total Expenses</h3>
            <p>${metrics.totalExpenses.toFixed(2)}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold">Savings</h3>
            <p>${metrics.savings.toFixed(2)}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold">Savings Rate</h3>
            <p>{metrics.savingsRate.toFixed(2)}%</p>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="mb-8">
        <Alerts
          metrics={metrics}
          expenseThreshold={expenseThreshold}
          savingsThreshold={savingsThreshold}
          onSetExpenseThreshold={setExpenseThreshold}
          onSetSavingsThreshold={setSavingsThreshold}
        />
      </div>

      {/* Charts Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Visualizations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold mb-2">Expense Breakdown</h3>
            <ExpenseBreakdownChart transactions={transactions} />
          </div>
          <div className="border p-4 rounded-lg">
            <h3 className="font-bold mb-2">Income vs. Expenses Over Time</h3>
            <IncomeVsExpensesChart transactions={transactions} />
          </div>
        </div>
      </div>

      {/* Transactions Table Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Transactions</h2>
        <div className="border p-4 rounded-lg">
          <TransactionsTable transactions={transactions} onDeleteTransaction={deleteTransaction} />
        </div>
      </div>

      {/* Insights Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Insights & Actions</h2>
        <Insights transactions={transactions} metrics={metrics} />
      </div>

      {/* Projections Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Projections</h2>
        <Projections transactions={transactions} metrics={metrics} />
      </div>
    </div>
  );
};

export default BudgetDashboard;

export const metadata = {
    title: 'Budget Dashboard',
    description: 'A personal finance budget dashboard to track income, expenses, and savings.',
    type: 'react',
    tags: ['finance', 'budget', 'dashboard', 'expenses', 'income', 'savings'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};
