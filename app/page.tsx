
'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  const [karat, setKarat] = useState('');
  const [pricePerGram, setPricePerGram] = useState('');
  const [weight, setWeight] = useState('');
  const [manualInput, setManualInput] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  // Simulated gold prices per gram in SAR (mocked for demo)
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
  };

  const handleReset = () => {
    setKarat('');
    setPricePerGram('');
    setWeight('');
    setManualInput(false);
    setResult(null);
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Gold Fair Price Calculator</h1>

      <div className="mb-4">
        <label className="block mb-1">Select Karat</label>
        <select
          value={karat}
          onChange={(e) => setKarat(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select --</option>
          <option value="24">24</option>
          <option value="21">21</option>
          <option value="18">18</option>
        </select>
      </div>

      <div className="mb-4">
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
          className="w-full p-2 border rounded"
          disabled={!manualInput}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Weight (grams)</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {result !== null && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <h2 className="text-lg font-semibold">Fair Price:</h2>
          <p className="text-xl">SAR {result.toFixed(2)}</p>
        </div>
      )}

      <button
        onClick={handleReset}
        className="mt-6 bg-gray-400 text-white px-4 py-2 rounded"
      >
        Clear
      </button>
    </main>
  );
}
