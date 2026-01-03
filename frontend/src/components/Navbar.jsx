export default function Navbar({ onAddClick }){

    function handleAddBookmark(){
        onAddClick();
    }

    return <div className="mt-2 mb-8 flex justify-between pt-3">
        <h1 className="text-4xl font-bold text-blue-900">MyVault</h1>
        <button onClick={handleAddBookmark} className="bg-blue-800 hover:bg-blue-500 cursor-pointer text-white p-2 rounded-2xl">+ Add New</button>
    </div>
}