const express = require('express');
const mongoose = require('mongoose');
const tradeRoutes = require('./routes/tradeRoutes');
const cargoRoutes = require('./routes/cargoRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const authRoutes = require('./routes/authRoutes');

// Initialize app
const app = express();
app.use(express.json())

// Routes
app.use(tradeRoutes);
app.use(cargoRoutes);
app.use(inventoryRoutes);
app.use(authRoutes);

const uri = 'give_Your_mongodbConnectionLink'

// Connect to MongoDB
mongoose.connect(uri).then(()=> console.log("MongoDB connection established")).catch((error)=>console.log("MongoDB connection failed: ", error.message));

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
