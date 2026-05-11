import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-400">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
