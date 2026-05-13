import React, { useState } from 'react';
import Payment from './Payment';

const PaymentTest = () => {
  const [amount, setAmount] = useState(500);
  const [itemName, setItemName] = useState('Melome Logistics Service');

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-900 rounded-lg border border-slate-800 p-8 mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Make a Payment</h1>
          <p className="text-slate-400 mb-6">Enter payment details below</p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Amount (R)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Item Name</label>
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <Payment 
          amount={amount} 
          itemName={itemName}
          itemDescription="Professional logistics and delivery service across SADC"
          customerEmail="customer@example.com"
          customerName="Customer"
          customerPhone="0780000000"
        />
      </div>
    </div>
  );
};

export default PaymentTest;