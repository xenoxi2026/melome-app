import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const WeChatButton = () => {
  const [showQR, setShowQR] = useState(false);
  
  // Your WeChat ID - Replace with your actual WeChat ID
  const wechatId = "MelomeLogistics";
  
  // WhatsApp number (South Africa format - remove first 0, add 27)
  const whatsappNumber = "27789467636";
  const whatsappMessage = "Hello Melome, I'm interested in your logistics services.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      {/* WhatsApp Button - Bottom Right */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
        
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          WhatsApp
        </span>
      </a>

      {/* WeChat Button - Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setShowQR(!showQR)}
          className="bg-green-600/90 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group relative"
          aria-label="Contact on WeChat"
        >
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.5 8.5H9V7H7.5V8.5Z" fill="currentColor"/>
            <path d="M12.5 7H11V8.5H12.5V7Z" fill="currentColor"/>
            <path d="M16.5 8.5H18V7H16.5V8.5Z" fill="currentColor"/>
            <path d="M19.5 11H18V12.5H19.5V11Z" fill="currentColor"/>
            <path d="M5.5 11H7V12.5H5.5V11Z" fill="currentColor"/>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M17 15C17 15 15.5 17 11.5 17C7.5 17 6 15 6 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="14.5" cy="12.5" r="0.5" fill="currentColor"/>
            <circle cx="9.5" cy="12.5" r="0.5" fill="currentColor"/>
          </svg>
          
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 text-white px-3 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            WeChat: {wechatId}
          </span>
        </button>

        {/* QR Code Popup */}
        {showQR && (
          <div className="absolute bottom-20 left-0 bg-slate-900 rounded-lg p-4 border border-slate-700 shadow-2xl">
            <button 
              onClick={() => setShowQR(false)}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs hover:bg-red-600 transition"
            >
              Ã—
            </button>
            <div className="text-center mb-2">
              <p className="text-white text-sm font-bold">WeChat ID: {wechatId}</p>
              <p className="text-slate-400 text-xs">Scan QR Code to add</p>
            </div>
            <QRCodeSVG 
              value={`https://weixin.qq.com/r/${wechatId}`} 
              size={180}
              bgColor="#1e293b"
              fgColor="#ffffff"
              level="H"
            />
            <p className="text-slate-500 text-xs text-center mt-2">æˆ–æœç´¢ID: {wechatId}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeChatButton;