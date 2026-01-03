import { useState } from "react";

export default function Search({ onSearch }) {
    const [val, setVal] = useState("");

    return (
        <div className="flex items-center justify-between gap-1.5">
            <input 
                className="w-full p-3 rounded-2xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none h-10" 
                type="text" 
                placeholder="Search Bookmark" 
                value={val}
                onChange={(e) => setVal(e.target.value)}
            />
            <button 
                onClick={() => onSearch(val)} 
                className="bg-blue-800 hover:bg-blue-500 cursor-pointer text-white p-2 px-6 rounded-2xl h-10"
            >
                Search
            </button>
        </div>
    );
}