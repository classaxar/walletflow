import React from 'react';
import { useWallet } from '../context/WalletContext';

const TransactionList = () => {
  const { data } = useWallet();

  return (
    <div className="glass-panel" style={{ flex: 1, minHeight: '400px' }}>
      <h3 style={{ marginBottom: '16px' }}>Recent Transactions</h3>
      
      {data.transactions.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>No transactions yet. Add one above!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '500px', overflowY: 'auto', paddingRight: '8px' }}>
          {data.transactions.map((t) => {
            
            let borderColor = 'var(--text-secondary)';
            if (t.type === 'Income') borderColor = 'var(--color-income)';
            else if (t.type === 'Expense') borderColor = 'var(--color-expense)';
            else if (t.type === 'Transfer') borderColor = 'var(--color-cash)';
            else if (t.type === 'Allocation') borderColor = 'var(--color-heart)';

            let operator = t.type === 'Income' || t.type === 'Allocation' ? '+' : '-';
            if (t.type === 'Transfer') operator = '⇄';

            return (
              <div key={t.id} style={{ 
                display: 'flex', justifyContent: 'space-between', padding: '12px',
                background: 'rgba(255,255,255,0.02)', borderRadius: '8px',
                borderLeft: `4px solid ${borderColor}`,
                alignItems: 'center'
              }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: '#fff' }}>
                    {t.description || `${t.type} Entry`}
                  </strong>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    {t.date} • {t.mode} • [ {t.wallet} ] • {t.type}
                  </span>
                </div>
                <div style={{ fontWeight: '600', color: borderColor, fontSize: '1.1rem' }}>
                  {operator} ₹{parseFloat(t.amount).toLocaleString('en-IN')}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TransactionList;
