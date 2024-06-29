import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const response = await axios.get('https://todoapp-7sa9.onrender.com/api/todos');
            setTodos(response.data.data);
        } catch (error) {
            console.error('Error fetching todos', error);
        }
    };

    const addTodo = async () => {
        try {
            const response = await axios.post('https://todoapp-7sa9.onrender.com/api/todos', { title, description });
            setTodos([...todos, response.data.data]);
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error adding todo', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`https://todoapp-7sa9.onrender.com/api/todos/${id}`);
            setTodos(todos.filter(todo => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };

    return (
        <div className="min-h-screen bg-white text-red-600 flex flex-col items-center p-4">
            <h1 className="text-4xl font-bold mb-4">Todo App</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border border-red-600 rounded p-2 m-2"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border border-red-600 rounded p-2 m-2"
                />
                <button
                    onClick={addTodo}
                    className="bg-red-600 text-white rounded p-2 m-2 hover:bg-red-700"
                >
                    Add Todo
                </button>
            </div>
            <ul className="w-full md:w-1/2">
                {todos.map(todo => (
                    <li key={todo._id} className="border border-red-600 rounded p-4 mb-2">
                        <h2 className="text-2xl font-semibold">{todo.title}</h2>
                        <p className="mb-2">{todo.description}</p>
                        <button
                            onClick={() => deleteTodo(todo._id)}
                            className="bg-red-600 text-white rounded p-2 hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
