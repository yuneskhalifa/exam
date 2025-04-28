'use client';

import { useState } from 'react';
import styles from '../styles/AccountingApp.module.css';

export default function Home() {
  const [accountId, setAccountId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactions, setTransactions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_id: accountId,
          amount: Number(amount), // amount should be a number
        }),
      });
  
      if (!res.ok) {
        throw new Error('Failed to submit transaction');
      }
  
      const newTransaction = await res.json(); // 👈 now you get the real balance from backend
  
      setTransactions([newTransaction, ...transactions]); // add to list
  
      // Clear the form
      setAccountId('');
      setAmount('');
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className={styles.container}>
      <h1>Accounting App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Account ID"
          value={accountId}
          onChange={(e) => setAccountId(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>Transaction History</h2>
        {transactions.length === 0 ? (
          <p className={styles.noTransactions}>No transactions yet.</p>
        ) : (
          <div>
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className={styles.transaction}
                data-type="transaction"
                data-account-id={transaction.account_id}
                data-amount={transaction.amount}
                data-balance={transaction.balance}
              >
             <p>
              <strong style={{ color: transaction.amount > 0 ? 'green' : 'red' }}>
                {transaction.amount > 0 ? "Deposit" : "Withdrawal"}
              </strong>: 
              {transaction.amount > 0 
                ? `Transferred ${Math.abs(transaction.amount)}$ to account ${transaction.account_id}.`
                : `Transferred ${Math.abs(transaction.amount)}$ from account ${transaction.account_id}.`}
              <br />
              Current account balance: <strong>{transaction.balance.toFixed(2)}$</strong>.
            </p>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
