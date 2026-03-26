import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

const TransactionList = () => {
  const { data } = useWallet();
  const [isExpanded, setIsExpanded] = useState(false);

  // Always map from the master data array
  const totalCount = data.transactions.length;
  // If expanded, show all. If not, show only the 5 most recent.
  const displayLimit = isExpanded ? totalCount : 5;
  const recent = data.transactions.slice(0, displayLimit);

  const getIcon = (wallet, type) => {
    if (type === 'Income') return '💰';
    if (type === 'Transfer') return '🏧';
    if (type === 'Allocation') return '🔄';
    if (wallet === 'Heart') return '💖';
    if (wallet === 'SIP') return '📈';
    return '🛒';
  };

  const getColor = (type, wallet) => {
    if (type === 'Income') return 'var(--color-income)';
    if (type === 'Expense') return 'var(--color-expense)';
    if (type === 'Transfer') return 'var(--color-cash)';
    return 'var(--color-heart)';
  };

  return (
    <section className="premium-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      
      <div className="ledger-header" style={{ padding: '32px 32px 16px 32px', margin: 0, borderBottom: '1px solid var(--surface-border)' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem' }}>
          Transaction History
        </h3>
        <span className="badge">{totalCount} Total Entries</span>
      </div>

      <div style={{ flex: 1, overflowY: isExpanded ? 'auto' : 'hidden', maxHeight: isExpanded ? '600px' : 'none', transition: 'max-height 0.3s ease' }}>
        {recent.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-tertiary)' }}>
            <span style={{ fontSize: '3rem', opacity: 0.5 }}>📝</span>
            <p style={{ marginTop: '16px' }}>No transactions recorded yet.</p>
          </div>
        ) : (
          recent.map((t) => {
            const operator = (t.type === 'Income' || t.type === 'Allocation') ? '+' : (t.type === 'Transfer' ? '⇄' : '-');
            const color = getColor(t.type, t.wallet);
            return (
              <div key={t.id} className="ledger-item" style={{ animation: 'fadeIn 0.3s ease' }}>
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="ledger-icon" style={{ color: color, borderColor: `${color}40`, boxShadow: `inset 0 0 15px ${color}10` }}>
                    {getIcon(t.wallet, t.type)}
                  </div>
                  <div className="ledger-details">
                    <div className="ledger-title">{t.description || t.category || t.type}</div>
                    <div className="ledger-tags">
                      <span>{t.date}</span>
                      <span>•</span>
                      <span>{t.category || 'Other'}</span>
                      <span>•</span>
                      <span>{t.mode}</span>
                      <span>•</span>
                      <span style={{ color: color }}>{t.wallet}</span>
                    </div>
                  </div>
                </div>

                <div className="ledger-amount" style={{ color: color }}>
                  {operator}₹{parseFloat(t.amount).toLocaleString('en-IN', {minimumFractionDigits: 2})}
                </div>

              </div>
            )
          })
        )}
      </div>

      {totalCount > 5 && (
        <div style={{ borderTop: '1px solid var(--surface-border)', background: 'rgba(255,255,255,0.01)' }}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ 
              background: 'transparent', 
              color: 'var(--text-secondary)', 
              border: 'none', 
              width: '100%', 
              padding: '16px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '0.9rem',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
          >
            {isExpanded ? 'Collapse History ▲' : `View ${totalCount - 5} More Transactions ▼`}
          </button>
        </div>
      )}
      
    </section>
  );
};
export default TransactionList;
