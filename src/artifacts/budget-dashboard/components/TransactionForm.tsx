import React, { useState } from 'react';

interface TransactionFormProps {
  onAddTransaction: (transaction: {
    date: string;
    amount: number;
    category: string;
    type: 'income' | 'expense';
  }) => void;
  type: 'income' | 'expense';
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onAddTransaction, type }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    onAddTransaction({
      date,
      amount: parseFloat(amount),
      category,
      type,
    });

    setAmount('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg">
      <h3 className="font-bold mb-2">Add {type === 'income' ? 'Income' : 'Expense'}</h3>
      <div className="mb-2">
        <label htmlFor={`date-${type}`} className="block text-sm font-medium text-gray-700">Date</label>
        <input
          type="date"
          id={`date-${type}`}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor={`amount-${type}`} className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="number"
          id={`amount-${type}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00"
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor={`category-${type}`} className="block text-sm font-medium text-gray-700">Category</label>
        <input
          type="text"
          id={`category-${type}`}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder={type === 'income' ? 'e.g. Salary' : 'e.g. Groceries'}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Add {type === 'income' ? 'Income' : 'Expense'}
      </button>
    </form>
  );
};

export default TransactionForm;
