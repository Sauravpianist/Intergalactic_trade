const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const tradeRoutes = require('./routes/tradeRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');

// Initialize app
const app = express();
app.use(bodyParser.json());

// Routes
app.use(tradeRoutes);
app.use(cargoRoutes);
app.use(inventoryRoutes);

const uri = 'mongodb+srv://sauravpianist:S21131012506%23p@chatappreact.8pgtp.mongodb.net/intergalactic_trade'

// Connect to MongoDB
mongoose.connect(uri).then(()=> console.log("MongoDB connection established")).catch((error)=>console.log("MongoDB connection failed: ", error.message));
// mongoose.connect('mongodb://localhost:27017/intergalactic_trade')
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error(err));

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
