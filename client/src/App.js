import { useState } from "react";
import axios from "axios";

/**
 * Allows users to rate their lifestyle preferences and matches them
 * with the best-fit neighborhoods using a backend scoring algorithm.
 */
function App() {
  const [form, setForm] = useState({
    safety: 5,
    greenery: 5,
    affordability: 5,
  });
  const [results, setResults] = useState([]);

  // Handle form submission and fetch match results
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/match", form);
    setResults(res.data);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">NeighborFit Matcher</h1>

      {/* User preference sliders */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {["safety", "greenery", "affordability"].map((key) => (
          <div key={key}>
            <label>{key.toUpperCase()}</label>
            <input
              type="range"
              min="1"
              max="10"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: +e.target.value })}
              className="w-full"
            />
          </div>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Match
        </button>
      </form>

      {/* Display match results */}
      {results.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Best Matches</h2>
          <ul className="list-disc ml-5">
            {results.map((n, i) => (
              <li key={i}>
                {n.name} - Score: {n.score}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
