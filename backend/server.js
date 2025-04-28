// const express = require('express');
// const cors = require('cors');


// const app = express();
// const PORT = 8080;

// app.use(cors()); // Allow requests from frontend
// app.use(express.json()); // Parse JSON body


// let transactions = [];
// let accounts = {}; // Holds account ID and balance

// // API route to get all transactions
// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     // Return all transactions
//     return res.status(200).json(transactions);
//   }

//   if (req.method === 'POST') {
//     // Handle new transaction
//     const { account_id, amount } = req.body;

//     if (!account_id || !amount) {
//       return res.status(400).json({ error: 'Account ID and Amount are required' });
//     }

//     // Update account balance
//     if (!accounts[account_id]) {
//       accounts[account_id] = 0; // If no account, initialize balance
//     }

//     accounts[account_id] += amount; // Update balance

//     // Create a new transaction
//     const transaction = {
//       id: transactions.length + 1,
//       account_id,
//       amount,
//       balance: accounts[account_id],
//       created_at: new Date().toISOString(),
//     };

//     transactions.unshift(transaction); // Add to the top of the list
//     return res.status(201).json(transaction);
//   }

//   res.status(405).json({ error: 'Method not allowed' });
// }


const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8080;

const corsOptions = {
    origin: 'http://localhost:3000', // your frontend's URL
    methods: ['GET', 'POST'],
  };
  
  app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON body

let transactions = [];
let accounts = {}; // Holds account ID and balance
app.get('/ping', (req, res) => {
  return res.status(200).send('Pong');
});

// GET all transactions
app.get('/transactions', (req, res) => {
  return res.status(200).json(transactions);
});

// Backend Route to get specific transaction by ID
app.get('/transactions/:id', (req, res) => {
  const transactionId = parseInt(req.params.id, 10);
  const transaction = transactions.find(t => t.transaction_id === transactionId);
  if (!transaction) {
    return res.status(404).json({ error: 'Transaction not found' });
  }
  return res.status(200).json(transaction);
});

// Backend Route to get account balance
app.get('/accounts/:account_id', (req, res) => {
  const accountId = req.params.account_id;
  const balance = accounts[accountId] || 0;
  return res.status(200).json({
    account_id: accountId,
    balance: balance
  });
});


// POST a new transaction
app.post('/transactions', (req, res) => {
  const { account_id, amount } = req.body;

  if (!account_id || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Account ID and Amount are required' });
  }

  // Update account balance
  if (!accounts[account_id]) {
    accounts[account_id] = 0; // If no account, initialize balance
  }

  accounts[account_id] += amount; // Update balance

  // Create a new transaction
  const transaction = {
    transaction_id: transactions.length + 1,
    account_id,
    amount,
    balance: accounts[account_id],
    //created_at: new Date().toISOString(),
  };

  transactions.unshift(transaction); // Add to the top of the list
  return res.status(201).json(transaction);
});

// Handle unsupported methods
app.all('/transactions', (req, res) => {
  res.status(405).json({ error: 'Method not allowed' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
