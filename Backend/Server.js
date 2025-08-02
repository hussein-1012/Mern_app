const express = require('express');
const dotenv = require('dotenv');
const data = require('./data/data');
const connectDB = require('./config/db.js');
const colols = require('colors');
const userRoutes = require('./Routes/userRoute.js');
const {notFound, errorHandler} = require('./middleware/error.js');  

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.use('/api/user', userRoutes);
app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.blue.bold);
});
