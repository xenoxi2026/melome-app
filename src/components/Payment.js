import React, { useState } from 'react';
import { CreditCard, Lock, Shield, CheckCircle } from 'lucide-react';

const Payment = ({ amount, itemName, itemDescription, customerEmail, customerName, customerPhone }) => {
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // LIVE PAYFAST CREDENTIALS
  const PAYFAST_CONFIG = {
    merchant_id: '34934721',
    merchant_key: 'nbmhut4xj9wi9',
    passphrase: 'MelomeMoney2020',
    url: 'https://www.payfast.co.za/eng/process',
  };

  // Simple MD5 hash function
  const md5 = (string) => {
    function rotateLeft(value, amount) {
      return (value << amount) | (value >>> (32 - amount));
    }

    function addUnsigned(x, y) {
      const x1 = x & 0xFFFF;
      const y1 = y & 0xFFFF;
      const x2 = x >>> 16;
      const y2 = y >>> 16;
      return ((((x1 + y1) & 0xFFFF) + ((((x2 + y2) & 0xFFFF) << 16))) >>> 0);
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return x ^ y ^ z; }
    function I(x, y, z) { return y ^ (x | (~z)); }

    function FF(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }

    const blocks = [];
    let i;
    let length = string.length;
    let wordCount = (((length + 8) >> 6) + 1) * 16;
    for (i = 0; i < wordCount; i++) {
      blocks[i] = 0;
    }
    for (i = 0; i < length; i++) {
      blocks[i >> 2] |= string.charCodeAt(i) << ((i % 4) * 8);
    }
    blocks[length >> 2] |= 0x80 << ((length % 4) * 8);
    blocks[wordCount - 2] = length * 8;

    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;

    for (i = 0; i < wordCount; i += 16) {
      const AA = a;
      const BB = b;
      const CC = c;
      const DD = d;
      
      a = FF(a, b, c, d, blocks[i + 0], 7, 0xD76AA478);
      d = FF(d, a, b, c, blocks[i + 1], 12, 0xE8C7B756);
      c = FF(c, d, a, b, blocks[i + 2], 17, 0x242070DB);
      b = FF(b, c, d, a, blocks[i + 3], 22, 0xC1BDCEEE);
      a = FF(a, b, c, d, blocks[i + 4], 7, 0xF57C0FAF);
      d = FF(d, a, b, c, blocks[i + 5], 12, 0x4787C62A);
      c = FF(c, d, a, b, blocks[i + 6], 17, 0xA8304613);
      b = FF(b, c, d, a, blocks[i + 7], 22, 0xFD469501);
      a = FF(a, b, c, d, blocks[i + 8], 7, 0x698098D8);
      d = FF(d, a, b, c, blocks[i + 9], 12, 0x8B44F7AF);
      c = FF(c, d, a, b, blocks[i + 10], 17, 0xFFFF5BB1);
      b = FF(b, c, d, a, blocks[i + 11], 22, 0x895CD7BE);
      a = FF(a, b, c, d, blocks[i + 12], 7, 0x6B901122);
      d = FF(d, a, b, c, blocks[i + 13], 12, 0xFD987193);
      c = FF(c, d, a, b, blocks[i + 14], 17, 0xA679438E);
      b = FF(b, c, d, a, blocks[i + 15], 22, 0x49B40821);
      
      a = GG(a, b, c, d, blocks[i + 1], 5, 0xF61E2562);
      d = GG(d, a, b, c, blocks[i + 6], 9, 0xC040B340);
      c = GG(c, d, a, b, blocks[i + 11], 14, 0x265E5A51);
      b = GG(b, c, d, a, blocks[i + 0], 20, 0xE9B6C7AA);
      a = GG(a, b, c, d, blocks[i + 5], 5, 0xD62F105D);
      d = GG(d, a, b, c, blocks[i + 10], 9, 0x2441453);
      c = GG(c, d, a, b, blocks[i + 15], 14, 0xD8A1E681);
      b = GG(b, c, d, a, blocks[i + 4], 20, 0xE7D3FBC8);
      a = GG(a, b, c, d, blocks[i + 9], 5, 0x21E1CDE6);
      d = GG(d, a, b, c, blocks[i + 14], 9, 0xC33707D6);
      c = GG(c, d, a, b, blocks[i + 3], 14, 0xF4D50D87);
      b = GG(b, c, d, a, blocks[i + 8], 20, 0x455A14ED);
      a = GG(a, b, c, d, blocks[i + 13], 5, 0xA9E3E905);
      d = GG(d, a, b, c, blocks[i + 2], 9, 0xFCEFA3F8);
      c = GG(c, d, a, b, blocks[i + 7], 14, 0x676F02D9);
      b = GG(b, c, d, a, blocks[i + 12], 20, 0x8D2A4C8A);
      
      a = HH(a, b, c, d, blocks[i + 5], 4, 0xFFFA3942);
      d = HH(d, a, b, c, blocks[i + 8], 11, 0x8771F681);
      c = HH(c, d, a, b, blocks[i + 11], 16, 0x6D9D6122);
      b = HH(b, c, d, a, blocks[i + 14], 23, 0xFDE5380C);
      a = HH(a, b, c, d, blocks[i + 1], 4, 0xA4BEEA44);
      d = HH(d, a, b, c, blocks[i + 4], 11, 0x4BDECFA9);
      c = HH(c, d, a, b, blocks[i + 7], 16, 0xF6BB4B60);
      b = HH(b, c, d, a, blocks[i + 10], 23, 0xBEBFBC70);
      a = HH(a, b, c, d, blocks[i + 13], 4, 0x289B7EC6);
      d = HH(d, a, b, c, blocks[i + 0], 11, 0xEAA127FA);
      c = HH(c, d, a, b, blocks[i + 3], 16, 0xD4EF3085);
      b = HH(b, c, d, a, blocks[i + 6], 23, 0x4881D05);
      a = HH(a, b, c, d, blocks[i + 9], 4, 0xD9D4D039);
      d = HH(d, a, b, c, blocks[i + 12], 11, 0xE6DB99E5);
      c = HH(c, d, a, b, blocks[i + 15], 16, 0x1FA27CF8);
      b = HH(b, c, d, a, blocks[i + 2], 23, 0xC4AC5665);
      
      a = II(a, b, c, d, blocks[i + 0], 6, 0xF4292244);
      d = II(d, a, b, c, blocks[i + 7], 10, 0x432AFF97);
      c = II(c, d, a, b, blocks[i + 14], 15, 0xAB9423A7);
      b = II(b, c, d, a, blocks[i + 5], 21, 0xFC93A039);
      a = II(a, b, c, d, blocks[i + 12], 6, 0x655B59C3);
      d = II(d, a, b, c, blocks[i + 3], 10, 0x8F0CCC92);
      c = II(c, d, a, b, blocks[i + 10], 15, 0xFFEFF47D);
      b = II(b, c, d, a, blocks[i + 1], 21, 0x85845DD1);
      a = II(a, b, c, d, blocks[i + 8], 6, 0x6FA87E4F);
      d = II(d, a, b, c, blocks[i + 15], 10, 0xFE2CE6E0);
      c = II(c, d, a, b, blocks[i + 6], 15, 0xA3014314);
      b = II(b, c, d, a, blocks[i + 13], 21, 0x4E0811A1);
      a = II(a, b, c, d, blocks[i + 4], 6, 0xF7537E82);
      d = II(d, a, b, c, blocks[i + 11], 10, 0xBD3AF235);
      c = II(c, d, a, b, blocks[i + 2], 15, 0x2AD7D2BB);
      b = II(b, c, d, a, blocks[i + 9], 21, 0xEB86D391);
      
      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }

    const hex = (x) => {
      const hexDigits = "0123456789abcdef";
      let result = "";
      for (let j = 0; j < 4; j++) {
        result += hexDigits.charAt((x >> (j * 8 + 4)) & 0x0F) + hexDigits.charAt((x >> (j * 8)) & 0x0F);
      }
      return result;
    };

    return (hex(a) + hex(b) + hex(c) + hex(d)).toLowerCase();
  };

  const generateSignature = (data) => {
    const queryString = Object.keys(data)
      .sort()
      .map(key => `${key}=${encodeURIComponent(data[key].toString().trim())}`)
      .join('&');
    
    const signatureString = PAYFAST_CONFIG.passphrase 
      ? `${queryString}&passphrase=${PAYFAST_CONFIG.passphrase}`
      : queryString;
    
    return md5(signatureString);
  };

  const handlePayment = async () => {
    setProcessing(true);

    const orderId = `MEL${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const paymentData = {
      merchant_id: PAYFAST_CONFIG.merchant_id,
      merchant_key: PAYFAST_CONFIG.merchant_key,
      return_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/cancel`,
      notify_url: `${window.location.origin}/api/payment/notify`,
      m_payment_id: orderId,
      amount: amount.toString(),
      item_name: itemName,
      item_description: itemDescription.substring(0, 100),
      email_address: customerEmail || 'info@melome.co.za',
      name_first: customerName || 'Customer',
      cell_number: customerPhone || '0780000000',
    };

    paymentData.signature = generateSignature(paymentData);

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = PAYFAST_CONFIG.url;
    form.target = '_blank';

    Object.keys(paymentData).forEach(key => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = paymentData[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
          <div className="bg-emerald-500/10 p-6 border-b border-slate-800">
            <h3 className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              <CreditCard size={24} />
              Secure Payment
            </h3>
            <p className="text-slate-400 text-sm mt-1">Pay securely with PayFast</p>
          </div>

          <div className="p-6">
            <div className="space-y-3 mb-6">
              <div 
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  paymentMethod === 'card' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <input type="radio" checked={paymentMethod === 'card'} readOnly />
                <span className="text-2xl">💳</span>
                <div>
                  <p className="font-bold">Credit/Debit Card</p>
                  <p className="text-slate-400 text-xs">Visa, Mastercard</p>
                </div>
              </div>

              <div 
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition ${
                  paymentMethod === 'eft' 
                    ? 'border-emerald-500 bg-emerald-500/10' 
                    : 'border-slate-700 hover:border-slate-600'
                }`}
                onClick={() => setPaymentMethod('eft')}
              >
                <input type="radio" checked={paymentMethod === 'eft'} readOnly />
                <span className="text-2xl">🏦</span>
                <div>
                  <p className="font-bold">Instant EFT</p>
                  <p className="text-slate-400 text-xs">Direct bank transfer</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Total:</span>
                <span className="text-emerald-400 font-bold text-xl">R{amount}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 mb-6 text-xs text-slate-500">
              <div className="flex items-center gap-1"><Lock size={12} /> Secure</div>
              <div className="flex items-center gap-1"><Shield size={12} /> Protected</div>
              <div className="flex items-center gap-1"><CheckCircle size={12} /> Instant</div>
            </div>

            <button
              onClick={handlePayment}
              disabled={processing}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-4 rounded-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {processing ? 'Processing...' : `Pay R${amount} →`}
            </button>

            <p className="text-slate-500 text-xs text-center mt-4">
              Redirecting to PayFast secure payment page
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;