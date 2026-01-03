export default function Card({ bookmark, onFav, onDelete }) {
  function redirect() {
    const link = bookmark.url.startsWith("http") ? bookmark.url : `https://${bookmark.url}`;
    window.open(link, "_blank");
  }

  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition relative group">
      <div className="flex justify-between items-start">
        <p className="text-blue-500 font-bold text-[12px] uppercase">{bookmark.category}</p>
        <div className="flex gap-2">
            <button onClick={onFav} className="cursor-pointer">{bookmark.isFavorite ? "❤️" : "🤍"}</button>
            <button onClick={onDelete} className="text-gray-300 hover:text-red-500 cursor-pointer text-xs">Delete</button>
        </div>
      </div>
      
      <p className="text-[16px] font-bold mt-1">{bookmark.title}</p>
      <p className="text-gray-400 text-[10px] truncate">{bookmark.url}</p>
      
      <p 
        className="mt-3 cursor-pointer text-blue-500 text-[12px] font-bold hover:underline" 
        onClick={redirect}
      >
        Visit Site
      </p>
    </div>
  );
}