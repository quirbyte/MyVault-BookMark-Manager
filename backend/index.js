import express from 'express';
import cors from 'cors';
// 1. Add toggleFavorite to the imports
import { addBookmark, deleteBookmark, getAllBookmarks, toggleFavorite } from './routes/bookmarks.js'; 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Get all bookmarks (Supports searching via /bookmarks?q=searchTerm)
app.get('/bookmarks', getAllBookmarks);

// Add a new bookmark
app.post('/bookmarks', addBookmark);

// Delete a bookmark
app.delete('/bookmarks/:id', deleteBookmark);

// 2. Add the Toggle Favorite route
// We use PATCH because we are only updating a part of the bookmark object
app.patch('/bookmarks/:id/favorite', toggleFavorite);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});