import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';

interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
}

interface TransactionsTableProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const TransactionsTable: React.FC<TransactionsTableProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Type</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => (
          <TableRow key={transaction.id}>
            <TableCell>{transaction.date}</TableCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
            <TableCell>{transaction.type}</TableCell>
            <TableCell>
              <Button variant="destructive" size="sm" onClick={() => onDeleteTransaction(transaction.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TransactionsTable;
