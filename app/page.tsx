
'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [karat, setKarat] = useState('');
  const [pricePerGram, setPricePerGram] = useState('');
  const [weight, setWeight] = useState('');
  const [manualInput, setManualInput] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const goldPrices = {
    '24': 364,
    '21': 318,
    '18': 273
  };

  useEffect(() => {
    if (!manualInput && karat && goldPrices[karat]) {
      setPricePerGram(goldPrices[karat].toString());
    }
  }, [karat, manualInput]);

  useEffect(() => {
    if (karat && pricePerGram && weight) {
      calculate();
    } else {
      setResult(null);
    }
  }, [weight, karat, pricePerGram]);

  const calculate = () => {
    const karatNum = parseInt(karat);
    const price = parseFloat(pricePerGram);
    const grams = parseFloat(weight);

    if (isNaN(karatNum) || isNaN(price) || isNaN(grams)) {
      setResult(null);
      return;
    }

    let multiplier = 1;
    if (karatNum === 21) multiplier = 1.3;
    else if (karatNum === 18) multiplier = 1.6;

    const fairPrice = grams * price * multiplier;
    setResult(fairPrice);
    const log = `Karat: ${karat}, Weight: ${grams}g, Fair Price: SAR ${fairPrice.toFixed(2)}`;
    setHistory([log, ...history.slice(0, 4)]);
  };

  const handleReset = () => {
    setKarat('');
    setPricePerGram('');
    setWeight('');
    setManualInput(false);
    setResult(null);
    setHistory([]);
  };

  const handleShare = () => {
    if (result !== null) {
      const text = `Gold Price Calculator:
Karat: ${karat}
Weight: ${weight}g
Price/Gram: SAR ${pricePerGram}
Fair Price: SAR ${result.toFixed(2)}`;
      navigator.share
        ? navigator.share({ title: 'Gold Price', text })
        : alert('Sharing not supported on this browser.');
    }
  };

  return (
    <main className={`${darkMode ? 'bg-[#15202b] text-white' : 'bg-white text-black'} min-h-screen p-6`}>
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gold Fair Price Calculator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-2 py-1 rounded border"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <div className="grid gap-4">
          <div>
            <label className="block mb-1">Select Karat</label>
            <select
              value={karat}
              onChange={(e) => setKarat(e.target.value)}
              className="w-full p-3 border rounded text-base"
            >
              <option value="">-- Select --</option>
              <option value="24">24</option>
              <option value="21">21</option>
              <option value="18">18</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">
              Gold Price (SAR per gram)
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={manualInput}
                  onChange={(e) => setManualInput(e.target.checked)}
                />
                <span>Enter manually</span>
              </div>
            </label>
            <input
              type="number"
              value={pricePerGram}
              onChange={(e) => setPricePerGram(e.target.value)}
              className="w-full p-3 border rounded text-base"
              disabled={!manualInput}
            />
          </div>

          <div>
            <label className="block mb-1">Weight (grams)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border rounded text-base"
            />
          </div>

          {result !== null && (
            <div className="mt-4 p-4 bg-green-100 text-green-900 rounded transition-opacity duration-500 ease-in">
              <h2 className="text-lg font-semibold">Fair Price:</h2>
              <p className="text-2xl font-bold mt-1">SAR {result.toFixed(2)}</p>
              <button
                onClick={handleShare}
                className="mt-3 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Share
              </button>
            </div>
          )}

          {history.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Recent Calculations</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {history.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={handleReset}
            className="mt-6 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
}
