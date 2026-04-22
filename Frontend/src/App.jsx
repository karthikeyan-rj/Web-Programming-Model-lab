import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

function Register() {
    const [u, setU] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const nav = useNavigate();
    const sub = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/register', u)
            .then(() => { alert("OK"); nav('/'); })
            .catch(err => alert(err.response.data));
    };
    return (
        <form onSubmit={sub}>
            <h2>Register</h2>
            Name: <input type="text" onChange={e => setU({ ...u, name: e.target.value })} /><br />
            Email: <input type="email" onChange={e => setU({ ...u, email: e.target.value })} /><br />
            Pass: <input type="password" onChange={e => setU({ ...u, password: e.target.value })} /><br />
            Confirm: <input type="password" onChange={e => setU({ ...u, confirmPassword: e.target.value })} /><br />
            <button>Register</button>
        </form>
    );
}

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const nav = useNavigate();
    const sub = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', { email, password: pass })
            .then(() => { alert("Login OK"); nav('/dash'); })
            .catch(() => alert("Fail"));
    };
    return (
        <form onSubmit={sub}>
            <h2>Login</h2>
            Email: <input type="email" onChange={e => setEmail(e.target.value)} placeholder='Default@gmail.com'/><br />
            Pass: <input type="password" onChange={e => setPass(e.target.value)} placeholder='defaultpassword' /><br />
            <button>Login</button>
        </form>
    );
}
function Dash() {
    const [books, setBooks] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/books').then(res => setBooks(res.data));
    }, []);
    const del = (id) => {
        axios.delete('http://localhost:5000/books/' + id).then(() => window.location.reload());
    };
    return (
        <div>
            <h2>Books</h2>
            <button onClick={() => nav('/add')}>Add Book</button><br/><br/>
            <table border="1">
                <thead>
                    <tr><th>Title</th><th>Author</th><th>Price</th><th>Cat</th><th>Action</th></tr>
                </thead>
                <tbody>
                    {books.map(b => (
                        <tr key={b._id}>
                            <td>{b.title}</td><td>{b.author}</td><td>{b.price}</td><td>{b.category}</td>
                            <td>
                                <button onClick={() => nav('/edit/' + b._id)}>Edit</button>
                                <button onClick={() => del(b._id)}>Del</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function Add() {
    const [b, setB] = useState({ title: '', author: '', price: '', category: '' });
    const nav = useNavigate();
    const sub = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/books', b).then(() => nav('/dash'));
    };
    return (
        <form onSubmit={sub}>
            <h2>Add Book</h2>
            Title: <input type="text" onChange={e => setB({ ...b, title: e.target.value })} /><br />
            Author: <input type="text" onChange={e => setB({ ...b, author: e.target.value })} /><br />
            Price: <input type="number" onChange={e => setB({ ...b, price: e.target.value })} /><br />
            Cat: <input type="text" onChange={e => setB({ ...b, category: e.target.value })} /><br />
            <button>Add</button>
        </form>
    );
}

// --- EDIT BOOK COMPONENT ---
function Edit() {
    const { id } = useParams();
    const [b, setB] = useState({ title: '', author: '', price: '', category: '' });
    const nav = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:5000/books/' + id).then(res => setB(res.data));
    }, [id]);
    const sub = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5000/books/' + id, b).then(() => nav('/dash'));
    };
    return (
        <form onSubmit={sub}>
            <h2>Edit Book</h2>
            Title: <input type="text" value={b.title} onChange={e => setB({ ...b, title: e.target.value })} /><br />
            Author: <input type="text" value={b.author} onChange={e => setB({ ...b, author: e.target.value })} /><br />
            Price: <input type="number" value={b.price} onChange={e => setB({ ...b, price: e.target.value })} /><br />
            Cat: <input type="text" value={b.category} onChange={e => setB({ ...b, category: e.target.value })} /><br />
            <button>Update</button>
        </form>
    );
}

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Login</Link> | <Link to="/reg">Register</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/reg" element={<Register />} />
                <Route path="/dash" element={<Dash />} />
                <Route path="/add" element={<Add />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </Router>
    );
}

export default App;
