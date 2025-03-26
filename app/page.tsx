
'use client';

import React, { useState } from 'react';

export default function Home() {
  const [karat, setKarat] = useState('');
  const [pricePerGram, setPricePerGram] = useState('');
  const [weight, setWeight] = useState('');
  const [results, setResults] = useState<number[]>([]);

  const handleCalculate = () => {
    const karatNum = parseInt(karat);
    const price = parseFloat(pricePerGram);
    const grams = parseFloat(weight);

    if (isNaN(karatNum) || isNaN(price) || isNaN(grams)) return;

    let multiplier = 1;
    if (karatNum === 21) multiplier = 1.3;
    else if (karatNum === 18) multiplier = 1.6;

    const fairPrice = grams * price * multiplier;
    setResults([...results, fairPrice]);
    setWeight('');
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
        <label className="block mb-1">Gold Price (SAR per gram)</label>
        <input
          type="number"
          value={pricePerGram}
          onChange={(e) => setPricePerGram(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      {karat && pricePerGram && (
        <>
          <div className="mb-4">
            <label className="block mb-1">Weight (grams)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            onClick={handleCalculate}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Calculate Fair Price
          </button>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Results</h2>
            <ul className="list-disc pl-5">
              {results.map((res, index) => (
                <li key={index}>SAR {res.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </main>
  );
}
