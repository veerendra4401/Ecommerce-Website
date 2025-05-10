const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');



app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/auth', authRoutes);

// Routes
app.use('/api/products', productRoutes);

app.get('/', (req, res) => res.send('E-commerce backend is running.'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
