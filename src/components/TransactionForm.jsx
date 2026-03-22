import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

const TransactionForm = () => {
  const { addTransaction } = useWallet();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Expense',
    mode: 'Online',
    amount: '',
    wallet: 'Needs',
    category: 'Food',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) return;
    addTransaction(formData);
    // Reset amount and description after submit
    setFormData({ ...formData, amount: '', description: '' });
  };

  const inputStyle = {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid var(--panel-border)',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    width: '100%',
    fontFamily: 'inherit'
  };

  return (
    <div className="glass-panel" style={{ marginBottom: '24px' }}>
      <h3 style={{ marginBottom: '16px' }}>Quick Add Transaction</h3>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Type</label>
          <select name="type" value={formData.type} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="Expense">Expense</option>
            <option style={{color:'#000'}} value="Income">Income</option>
            <option style={{color:'#000'}} value="Transfer">Transfer to Cash</option>
            <option style={{color:'#000'}} value="Allocation">Virtual Allocation (To Heart)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Amount (₹)</label>
          <input type="number" name="amount" required value={formData.amount} onChange={handleChange} style={inputStyle} placeholder="e.g. 500" />
        </div>

        {formData.type !== 'Allocation' && (
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Payment Mode</label>
            <select name="mode" value={formData.mode} onChange={handleChange} style={inputStyle}>
              <option style={{color:'#000'}} value="Online">Online / Bank</option>
              <option style={{color:'#000'}} value="Cash">Cash</option>
            </select>
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Virtual Wallet</label>
          <select name="wallet" value={formData.wallet} onChange={handleChange} style={inputStyle}>
            <option style={{color:'#000'}} value="Needs">Needs / Family</option>
            <option style={{color:'#000'}} value="Heart">Heart (Pocket Money)</option>
            <option style={{color:'#000'}} value="SIP">SIP Investment</option>
          </select>
        </div>

        <div style={{ gridColumn: '1 / -1' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Description</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} style={inputStyle} placeholder="e.g. Samosa or Petrol" />
        </div>

        <div style={{ gridColumn: '1 / -1', marginTop: '8px' }}>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Add Record</button>
        </div>

      </form>
    </div>
  );
};

export default TransactionForm;
