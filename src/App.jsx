import React, { useState } from 'react';
import './index.css';
import { useWallet } from './context/WalletContext';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

// Advanced Sidebar Navigation Component
const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'transactions', icon: '📝', label: 'Transactions' },
    { id: 'summary', icon: '📅', label: 'Monthly Summary' },
    { id: 'setup', icon: '⚙️', label: 'Envelopes Setup' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-text">WalletFlow</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {tabs.map(tab => (
          <div 
            key={tab.id}
            className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span style={{ fontSize: '1.2rem' }}>{tab.icon}</span>
            <span>{tab.label}</span>
          </div>
        ))}
      </nav>
      <div style={{ marginTop: 'auto', paddingTop: '40px' }}>
        <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>Current Plan</p>
          <p style={{ fontWeight: '600', color: 'var(--color-heart)' }}>Premium SaaS Edition</p>
        </div>
      </div>
    </aside>
  );
};

function App() {
  const { balances, data } = useWallet();
  const [activeTab, setActiveTab] = useState('dashboard');

  const formatFn = (val) => val.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const categoryColors = {
    Eating: '#f97316',
    Transportation: '#3b82f6',
    College: '#a855f7',
    Music: '#ec4899',
    SIP: '#10b981',
    Family: '#14b8a6',
    Other: '#64748b'
  };

  const getChartData = React.useCallback((modeFilter) => {
    const map = {};
    if (!data || !data.transactions) return [];
    data.transactions
      .filter(t => t.type === 'Expense' && t.mode === modeFilter)
      .forEach(t => {
        const cat = t.category || 'Other';
        map[cat] = (map[cat] || 0) + parseFloat(t.amount);
      });
    return Object.entries(map)
      .map(([name, value]) => ({ name, value, color: categoryColors[name] || '#64748b' }))
      .filter(item => item.value > 0).sort((a,b) => b.value - a.value);
  }, [data]);

  const bankChartData = React.useMemo(() => getChartData('Online'), [getChartData]);
  const cashChartData = React.useMemo(() => getChartData('Cash'), [getChartData]);

  const renderCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'rgba(15, 20, 35, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid var(--surface-border)', padding: '12px 16px', borderRadius: '12px' }}>
          <p style={{ margin: 0, color: payload[0].payload.color, fontWeight: '700', fontSize: '0.9rem' }}>{payload[0].name}</p>
          <p style={{ margin: '4px 0 0 0', color: '#fff', fontSize: '1.1rem', fontFamily: 'var(--font-display)' }}>₹ {formatFn(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-dashboard">
        <header className="page-header">
          <h1 className="page-title">
            {activeTab === 'dashboard' ? 'Overview' : 
             activeTab === 'transactions' ? 'Transactions' : 
             activeTab === 'summary' ? 'Historical Data' : 'Configuration'}
          </h1>
        </header>

        {activeTab === 'dashboard' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="envelope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: 0 }}>
              
              <div className="premium-card envelope-hero" style={{ gridColumn: 'span 1' }}>
                <div className="envelope-label">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-bank)' }}></div>
                  Bank Balance
                </div>
                <h2 className="envelope-value" style={{ color: 'var(--color-bank)' }}>
                  <span style={{fontSize: '1.5rem', verticalAlign: 'middle', opacity: 0.5}}>₹ </span>
                  {formatFn(balances.bank)}
                </h2>
              </div>

              <div className="premium-card" style={{ background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.15) 0%, rgba(34, 197, 94, 0.05) 100%)', borderColor: 'rgba(74, 222, 128, 0.2)' }}>
                <div className="envelope-label">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-cash)' }}></div>
                  Physical Cash
                </div>
                <h2 className="envelope-value" style={{ color: 'var(--color-cash)' }}>
                  <span style={{fontSize: '1.5rem', opacity: 0.5}}>₹ </span>{formatFn(balances.cash)}
                </h2>
              </div>

              <div className="premium-card">
                <div className="envelope-label">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-needs)' }}></div>
                  Needs Bucket
                </div>
                <h2 className="envelope-value" style={{ color: 'var(--text-primary)' }}>
                  <span style={{fontSize: '1.5rem', opacity: 0.5}}>₹ </span>{formatFn(balances.needs)}
                </h2>
              </div>

              <div className="premium-card">
                <div className="envelope-label">
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--color-heart)' }}></div>
                  Heart Bucket
                </div>
                <h2 className="envelope-value" style={{ color: 'var(--color-heart)' }}>
                  <span style={{fontSize: '1.5rem', opacity: 0.5}}>₹ </span>{formatFn(balances.heart)}
                </h2>
              </div>

            </div>

            {/* Analytics Charts Row */}
            <div className="envelope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginBottom: 0 }}>
              {bankChartData.length > 0 ? (
                <div className="premium-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '20px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Bank Analytics</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={bankChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5}>
                        {bankChartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                      <Tooltip content={renderCustomTooltip} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="premium-card" style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '330px' }}>
                  <p style={{ color: 'var(--text-tertiary)' }}>No Bank analytics data yet.</p>
                </div>
              )}
              
              {cashChartData.length > 0 ? (
                <div className="premium-card" style={{ padding: '24px' }}>
                  <h3 style={{ fontSize: '1.05rem', marginBottom: '20px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>Cash Analytics</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={cashChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} paddingAngle={5}>
                        {cashChartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                      </Pie>
                      <Tooltip content={renderCustomTooltip} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="premium-card" style={{ padding: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '330px' }}>
                  <p style={{ color: 'var(--text-tertiary)' }}>No Cash analytics data yet.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab Fallbacks */}
        {activeTab === 'transactions' && (
          <div className="action-grid">
            <TransactionForm />
            <TransactionList showAll={true} />
          </div>
        )}

        {(activeTab === 'summary' || activeTab === 'setup') && (
           <div className="premium-card" style={{ textAlign: 'center', padding: '100px 40px' }}>
            <h2 className="page-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>🚀 Stitch Generated Screens</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              The high-fidelity designs for these screens perfectly match this new "Digital Private Bank" aesthetic. They will be implemented into the React router shortly!
            </p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
