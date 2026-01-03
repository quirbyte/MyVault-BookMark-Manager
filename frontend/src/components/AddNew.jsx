import { useState } from "react";

export default function AddBookmarkModal({ onClose, onRefresh }) {
  const [formData, setFormData] = useState({ category: "", title: "", url: "" });

  const addBookmark = async (e) => {
    e.preventDefault(); // Prevent page reload
    await fetch("http://localhost:3000/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    onRefresh(); // Reload list in App.jsx
    onClose();   // Close modal
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">New Bookmark</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black text-2xl">&times;</button>
        </div>

        <form onSubmit={addBookmark} className="space-y-4">
          <input 
            required
            placeholder="Category (e.g. DESIGN)" 
            className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <input 
            required
            placeholder="Name (e.g. GitHub)" 
            className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <input 
            required
            type="url" 
            placeholder="URL (https://...)" 
            className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600"
            onChange={(e) => setFormData({...formData, url: e.target.value})}
          />
          <button type="submit" className="w-full py-3 bg-blue-800 text-white rounded-xl font-semibold hover:bg-blue-700">
            Save Bookmark
          </button>
        </form>
      </div>
    </div>
  );
}