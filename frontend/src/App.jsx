import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Card from "./components/card";
import AddBookmarkModal from "./components/AddNew";
import { useState, useEffect } from "react";

function App() {
  const [showModal, setShowModal] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // 1. Function to fetch bookmarks (handles both normal load and search)
  const fetchBookmarks = async (query = "") => {
    try {
      const response = await fetch(`http://localhost:3000/bookmarks?q=${query}`);
      const data = await response.json();
      setBookmarks(data.bookmarks);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  // Initial load
  useEffect(() => {
    fetchBookmarks();
  }, []);

  // 2. Function to toggle favorite (PATCH)
  const toggleFav = async (id) => {
    await fetch(`http://localhost:3000/bookmarks/${id}/favorite`, { method: "PATCH" });
    fetchBookmarks(); // Refresh list to show heart change
  };

  // 3. Function to delete (DELETE)
  const deleteBm = async (id) => {
    await fetch(`http://localhost:3000/bookmarks/${id}`, { method: "DELETE" });
    fetchBookmarks();
  };

  return (
    <div className="pl-[10.5vw] pr-[10.5vw] min-h-screen bg-gray-50 pb-20">
      <Navbar onAddClick={() => setShowModal(true)} />
      <Search onSearch={fetchBookmarks} />
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-9">
        {bookmarks.map((bm) => (
          <Card 
            key={bm.id} 
            bookmark={bm} 
            onFav={() => toggleFav(bm.id)} 
            onDelete={() => deleteBm(bm.id)}
          />
        ))}
      </div>

      {showModal && (
        <AddBookmarkModal 
          onClose={() => setShowModal(false)} 
          onRefresh={fetchBookmarks} 
        />
      )}
    </div>
  );
}

export default App;