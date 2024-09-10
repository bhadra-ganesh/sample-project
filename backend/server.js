const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose'); 
const routes = require('./routes/api_routes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true 
  }));
app.use(cookieParser())
const port = process.env.PORT || 3000;
const mongoURI = process.env.URL; 
app.use(express.json());
app.use('/api', routes);
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); 
    }
};

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    });
});

module.exports={app,connectToDatabase};