let transactions = [];
let accounts = {}; // Holds account ID and balance

// API route to get all transactions
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return all transactions
    return res.status(200).json(transactions);
  }

  if (req.method === 'POST') {
    // Handle new transaction
    const { account_id, amount } = req.body;

    if (!account_id || !amount) {
      return res.status(400).json({ error: 'Account ID and Amount are required' });
    }

    // Update account balance
    if (!accounts[account_id]) {
      accounts[account_id] = 0; // If no account, initialize balance
    }

    accounts[account_id] += amount; // Update balance

    // Create a new transaction
    const transaction = {
      id: transactions.length + 1,
      account_id,
      amount,
      balance: accounts[account_id],
      created_at: new Date().toISOString(),
    };

    transactions.unshift(transaction); // Add to the top of the list
    return res.status(201).json(transaction);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
