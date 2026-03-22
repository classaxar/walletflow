import React, { useState } from 'react';
import './index.css';
import Sidebar from './components/Sidebar';
import { useWallet } from './context/WalletContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App() {
  const { balances } = useWallet();
  const [activeTab, setActiveTab] = useState('dashboard');

  const formatCurrency = (val) => {
    return '₹ ' + val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        <header style={{ marginBottom: '32px' }}>
          <h1>
            {activeTab === 'dashboard' ? 'Dashboard' 
            : activeTab === 'transactions' ? 'Transactions' 
            : activeTab === 'summary' ? 'Monthly Summary' 
            : 'Setup Envelopes'}
          </h1>
          <p>Welcome to WalletFlow. Your smart envelope budgeting system.</p>
        </header>

        {activeTab === 'dashboard' && (
          <>
            {/* Dashboard Grid for Balances */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
              
              <div className="glass-panel">
                <h3>Bank Balance</h3>
                <p>Physical account</p>
                <h2 style={{ color: 'var(--color-bank)', marginTop: '12px', fontSize: '2.5rem' }}>{formatCurrency(balances.bank)}</h2>
              </div>
              
              <div className="glass-panel">
                <h3>Cash in Hand</h3>
                <p>Physical account</p>
                <h2 style={{ color: 'var(--color-cash)', marginTop: '12px', fontSize: '2.5rem' }}>{formatCurrency(balances.cash)}</h2>
              </div>

              <div className="glass-panel" style={{ borderTop: '4px solid var(--color-heart)' }}>
                <h3>Heart Envelope</h3>
                <p>Virtual allocation (Pocket Money)</p>
                <h2 style={{ color: 'var(--color-heart)', marginTop: '12px', fontSize: '2.5rem' }}>{formatCurrency(balances.heart)}</h2>
              </div>

              <div className="glass-panel" style={{ borderTop: '4px solid var(--text-primary)' }}>
                <h3>Needs Envelope</h3>
                <p>Virtual allocation (Family/Needs)</p>
                <h2 style={{ color: 'var(--text-primary)', marginTop: '12px', fontSize: '2.5rem' }}>{formatCurrency(balances.needs)}</h2>
              </div>

            </div>

            {/* Form and Ledger Area */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
              <div>
                <TransactionForm />
              </div>
              <div style={{ display: 'flex' }}>
                <TransactionList />
              </div>
            </div>
          </>
        )}

        {activeTab === 'transactions' && (
           <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
              <div>
                <TransactionForm />
              </div>
              <div style={{ display: 'flex' }}>
                <TransactionList />
              </div>
           </div>
        )}

        {activeTab === 'summary' && (
          <div className="glass-panel" style={{ textAlign: 'center', padding: '80px', marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem' }}>📅 Monthly Summary</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.1rem' }}>This section will show your historical math and rollovers just like your MONTHLY_SUMMARY.csv.</p>
            <p style={{ color: 'var(--color-bank)', marginTop: '24px', fontWeight: 'bold' }}>Coming in the next update!</p>
          </div>
        )}

        {activeTab === 'setup' && (
           <div className="glass-panel" style={{ textAlign: 'center', padding: '80px', marginTop: '40px' }}>
            <h2 style={{ fontSize: '2rem' }}>⚙️ Setup Envelopes</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '16px', fontSize: '1.1rem' }}>Configure your custom 40,000 Income base and customize Heart/SIP percentages here.</p>
            <p style={{ color: 'var(--color-heart)', marginTop: '24px', fontWeight: 'bold' }}>Coming in the next update!</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
