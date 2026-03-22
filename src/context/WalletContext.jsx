import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  // Try to load from local storage or use defaults
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('walletflow_data');
    if (saved) return JSON.parse(saved);
    return {
      transactions: [],
      // Base configurations
      allocations: {
        income: 40000,
        sip: 20000,
        heart: 5000,
      }
    };
  });

  // Save to local storage whenever data changes
  useEffect(() => {
    localStorage.setItem('walletflow_data', JSON.stringify(data));
  }, [data]);

  // Derived Balances Calculation
  const getBalances = () => {
    let bank = 0;
    let cash = 0;
    let heart = 0;
    let needs = 0;

    data.transactions.forEach(t => {
      const amt = parseFloat(t.amount);
      
      if (t.type === 'Income') {
        // Income strictly goes to Bank and fills Needs envelope
        bank += amt;
        needs += amt;
      } 
      else if (t.type === 'Expense') {
        // Expense reduces physical mode and virtual wallet
        if (t.mode === 'Cash') {
          cash -= amt;
          // CASH RULE: If you spend cash, it does NOT reduce Heart or Needs again,
          // because it was already deducted from the envelope when you withdrew it (Transfer).
        }
        else if (t.mode === 'Online') {
          bank -= amt;
          if (t.wallet === 'Heart') heart -= amt;
          if (t.wallet === 'Needs') needs -= amt;
          if (t.wallet === 'SIP') {
             needs -= amt; // taking it from the general needs pool
          }
        }
      }
      else if (t.type === 'Transfer' && t.wallet === 'Heart') {
        // Transfer cash from Bank ATM for pocket money (Heart)
        bank -= amt;
        cash += amt;
        heart -= amt; // Using pocket money allocation
      }
      else if (t.type === 'Allocation') {
        // Internal movement purely for envelopes when a new month starts/income happens
        if (t.wallet === 'Heart') {
           needs -= amt; // Take from needs pool
           heart += amt; // Give to heart bucket
        }
      }
    });

    return { bank, cash, heart, needs };
  };

  const addTransaction = (transaction) => {
    setData(prev => ({
      ...prev,
      transactions: [{ ...transaction, id: Date.now() }, ...prev.transactions]
    }));
  };

  return (
    <WalletContext.Provider value={{ data, addTransaction, balances: getBalances() }}>
      {children}
    </WalletContext.Provider>
  );
};
