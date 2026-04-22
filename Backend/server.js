const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect('mongodb://localhost:27017/bookdb')
    .then(() => console.log("DB Connected"))
    .catch(err => console.log(err));

// Routes
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');

app.use('/', authRoutes);
app.use('/books', bookRoutes);

app.listen(5000, () => console.log("Server on 5000"));