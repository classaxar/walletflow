import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const getBtnStyle = (tabId) => {
    if (activeTab === tabId) {
      return { textAlign: 'left', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' };
    }
    return { textAlign: 'left', background: 'transparent', border: '1px solid transparent' };
  };

  return (
    <aside className="glass-panel" style={{ 
      width: '280px', 
      minHeight: '100vh', 
      borderRadius: '0', 
      borderTop: 'none', 
      borderBottom: 'none', 
      borderLeft: 'none',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ marginBottom: '48px' }}>
        <h2 style={{ color: 'var(--text-primary)', letterSpacing: '0.5px', fontSize: '1.8rem' }}>
          <span style={{ color: 'var(--color-bank)' }}>Wallet</span>Flow
        </h2>
        <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Your Daily Hisab Tracker</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <button onClick={() => setActiveTab('dashboard')} className="btn" style={getBtnStyle('dashboard')}>
          📊 Dashboard
        </button>
        <button onClick={() => setActiveTab('transactions')} className="btn" style={getBtnStyle('transactions')}>
          📝 Transactions
        </button>
        <button onClick={() => setActiveTab('summary')} className="btn" style={getBtnStyle('summary')}>
          📅 Monthly Summary
        </button>
        <button onClick={() => setActiveTab('setup')} className="btn" style={getBtnStyle('setup')}>
          ⚙️ Setup Envelopes
        </button>
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--panel-border)', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
        <p>WalletFlow Pro version coming soon.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
