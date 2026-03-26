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
    category: 'Eating',
    description: ''
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount) return;
    addTransaction(formData);
    setFormData({ ...formData, amount: '', description: '' });
  };

  return (
    <section className="premium-card" style={{ position: 'relative' }}>
      <h3 className="section-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', marginBottom: '24px' }}>
        Log New Transaction
      </h3>
      <form onSubmit={handleSubmit} className="add-form">
        
        {/* Row 1: Type & Amount */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label className="form-label">Type</label>
            <select name="type" value={formData.type} onChange={handleChange} className="premium-input" style={{ padding: '14px', cursor: 'pointer' }}>
              <option className="theme-option" value="Expense">Expense</option>
              <option className="theme-option" value="Income">Income</option>
              <option className="theme-option" value="Transfer">Transfer to Cash</option>
              <option className="theme-option" value="Allocation">Virtual Allocation (To Heart)</option>
            </select>
          </div>
          <div>
            <label className="form-label">Amount (₹)</label>
            <input type="number" name="amount" required value={formData.amount} onChange={handleChange} className="premium-input" placeholder="0.00" style={{ padding: '14px', fontSize: '1.1rem', fontWeight: '600' }} />
          </div>
        </div>

        {/* Row 2: Category, Mode, Wallet */}
        {formData.type !== 'Allocation' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label className="form-label">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="premium-input" style={{ padding: '14px', fontSize: '0.9rem', cursor: 'pointer' }}>
                <option className="theme-option" value="Eating">Eating / Food</option>
                <option className="theme-option" value="Transportation">Transportation</option>
                <option className="theme-option" value="College">College Stuff</option>
                <option className="theme-option" value="Music">Music / Subs</option>
                <option className="theme-option" value="SIP">SIP / Invest</option>
                <option className="theme-option" value="Family">Family / Needs</option>
                <option className="theme-option" value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="form-label">Payment Mode</label>
              <select name="mode" value={formData.mode} onChange={handleChange} className="premium-input" style={{ padding: '14px', fontSize: '0.9rem', cursor: 'pointer' }}>
                <option className="theme-option" value="Online">Online / Bank</option>
                <option className="theme-option" value="Cash">Cash</option>
              </select>
            </div>
            <div>
              <label className="form-label">Deduct From</label>
              <select name="wallet" value={formData.wallet} onChange={handleChange} className="premium-input" style={{ padding: '14px', fontSize: '0.9rem', cursor: 'pointer' }}>
                <option className="theme-option" value="Needs">Needs</option>
                <option className="theme-option" value="Heart">Heart</option>
                <option className="theme-option" value="SIP">SIP</option>
              </select>
            </div>
          </div>
        )}

        {/* Row 3: Description & Submit */}
        <div className="form-input-group" style={{ marginBottom: '24px' }}>
          <label className="form-label">Notes</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} className="premium-input" placeholder="Optional notes for this transaction..." style={{ padding: '14px' }} />
        </div>

        <button type="submit" className="premium-btn">
          Post Record
        </button>
      </form>
    </section>
  );
};
export default TransactionForm;
