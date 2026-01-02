import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('user_id');
    const userName = localStorage.getItem('user_name');

    useEffect(() => {
        if (!userId) {
            navigate('/login');
            return;
        }
        fetchNotes();
    }, [userId, navigate]);

    const fetchNotes = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/notes/${userId}`);
            setNotes(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddNote = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/api/notes', { 
                user_id: userId, 
                title, 
                content 
            });
            setTitle('');
            setContent('');
            fetchNotes();
        } catch (err) {
            alert('Failed to add note');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        navigate('/login');
    };

    return (
        <div className="min-h-screen p-8">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-600">Hello, {userName}</span>
                    <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Input Form */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-8">
                        <h2 className="text-xl font-bold mb-4 text-gray-700">Add New Note</h2>
                        <form onSubmit={handleAddNote} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Title"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500  bg-gray-50"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                required
                            />
                            <textarea
                                placeholder="Content"
                                rows="4"
                                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-50 resize-none"
                                value={content}
                                onChange={e => setContent(e.target.value)}
                                required
                            />
                            <button type="submit" className="w-full bg-indigo-600 text-white font-bold p-3 rounded-lg hover:bg-indigo-700 transition shadow-sm">
                                Add Note
                            </button>
                        </form>
                    </div>
                </div>

                {/* Notes List */}
                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {notes.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center py-10">No notes yet. Create one!</p>
                    ) : (
                        notes.map(note => (
                            <div key={note.note_id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                                <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{note.title}</h3>
                                <p className="text-gray-600 whitespace-pre-wrap text-sm line-clamp-6">{note.content}</p>
                                <p className="text-xs text-gray-400 mt-3">{new Date(note.created_at).toLocaleString()}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
