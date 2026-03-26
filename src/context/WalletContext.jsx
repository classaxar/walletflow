import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

// Temporary User ID to prevent global data mixing until Authentication is fully added
const TEMP_USER_ID = "walletflow_admin";

export const WalletProvider = ({ children }) => {
  const [data, setData] = useState({ transactions: [], allocations: { income: 40000, sip: 20000, heart: 5000 } });
  const [loading, setLoading] = useState(true);

  // Set up Live Cloud Sync to replace standard LocalStorage
  useEffect(() => {
    const q = query(
      collection(db, "transactions"),
      where("userId", "==", TEMP_USER_ID)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fbTransactions = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort in-memory instead of Firestore orderBy to prevent requiring remote composite index setups
      fbTransactions.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      setData(prev => ({ ...prev, transactions: fbTransactions }));
      setLoading(false);
    }, (err) => {
      console.error("Firestore sync error:", err);
      // Fallback so application doesn't completely crash if database goes down
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Complex Math Logic mapped precisely onto the live Cloud array
  const getBalances = () => {
    let bank = 0;
    let cash = 0;
    let heart = 0;
    let needs = 0;

    data.transactions.forEach(t => {
      const amt = parseFloat(t.amount);
      
      if (t.type === 'Income') {
        bank += amt;
        needs += amt;
      } 
      else if (t.type === 'Expense') {
        if (t.mode === 'Cash') {
          cash -= amt;
        }
        else if (t.mode === 'Online') {
          bank -= amt;
          if (t.wallet === 'Heart') heart -= amt;
          if (t.wallet === 'Needs') needs -= amt;
          if (t.wallet === 'SIP') { needs -= amt; }
        }
      }
      else if (t.type === 'Transfer' && t.wallet === 'Heart') {
        bank -= amt;
        cash += amt;
        heart -= amt;
      }
      else if (t.type === 'Allocation') {
        if (t.wallet === 'Heart') {
           needs -= amt; 
           heart += amt; 
        }
      }
    });

    return { bank, cash, heart, needs };
  };

  const addTransaction = async (transaction) => {
    // Instead of pushing to local memory, construct the package and push straight to Cloud Firestore
    try {
      await addDoc(collection(db, "transactions"), {
        ...transaction,
        amount: parseFloat(transaction.amount),
        userId: TEMP_USER_ID,
        createdAt: new Date().toISOString()
      });
    } catch (e) {
      console.error("Error adding doc:", e);
      alert("Failed to sync transaction. Check connection or Database rules.");
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0a0a', color: 'var(--text-secondary)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', animation: 'pulse 1.5s infinite', fontSize: '1.2rem', letterSpacing: '1px' }}>
          Syncing with Private Cloud...
        </h2>
      </div>
    );
  }

  return (
    <WalletContext.Provider value={{ data, addTransaction, balances: getBalances() }}>
      {children}
    </WalletContext.Provider>
  );
};
