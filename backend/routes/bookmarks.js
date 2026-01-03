let bookmarks = [];
let idCounter = 0;

// Get all bookmarks (with Search functionality)
export async function getAllBookmarks(req, res) {
  try {
    const { q } = req.query; // Extracts ?q=text from the URL
    let results = [...bookmarks];

    if (q) {
      const searchTerm = q.toLowerCase();
      results = results.filter(bm => 
        bm.title.toLowerCase().includes(searchTerm) || 
        bm.category.toLowerCase().includes(searchTerm)
      );
    }

    res.json({
      msg: "Bookmarks fetched successfully",
      bookmarks: results,
    });
  } catch (error) {
    res.status(500).json({ msg: "Error in fetching bookmarks" });
  }
}

// Add a new bookmark
export async function addBookmark(req, res) {
  try {
    idCounter++;
    const { category, title, url } = req.body;
    
    // We add 'isFavorite' here so every new bookmark starts as unfavorited
    const newBookmark = { 
        id: idCounter, 
        category, 
        title, 
        url, 
        isFavorite: false 
    };
    
    bookmarks.push(newBookmark);
    res.status(201).json({
      msg: "Bookmark Added successfully",
      bookmark: newBookmark
    });
  } catch (error) {
    res.status(500).json({ msg: "Error in Adding Bookmark" });
  }
}

// Toggle Favorite/Unfavorite
export async function toggleFavorite(req, res) {
  try {
    const bmId = parseInt(req.params.id);
    const bookmark = bookmarks.find(bm => bm.id === bmId);

    if (!bookmark) {
      return res.status(404).json({ msg: "Bookmark not found" });
    }

    // Flips true to false, or false to true
    bookmark.isFavorite = !bookmark.isFavorite;

    res.json({
      msg: bookmark.isFavorite ? "Marked as favorite" : "Removed from favorites",
      bookmark
    });
  } catch (error) {
    res.status(500).json({ msg: "Error updating favorite status" });
  }
}

// Delete a bookmark (Keeping your existing logic)
export async function deleteBookmark(req, res) {
  try {
    const bmId = parseInt(req.params.id);
    const index = bookmarks.findIndex(bm => bm.id === bmId);
    if (index !== -1) {
      bookmarks.splice(index, 1);
      return res.json({ msg: "Bookmark deleted successfully" });
    }
    res.status(404).json({ msg: "Bookmark not found" });
  } catch (error) {
    res.status(500).json({ msg: "Error in deleting bookmark" });
  }
}