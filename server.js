import express from 'express'
import { recipeRouter } from './routes/recipeRouter.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/recipes', recipeRouter);


app.listen(8080, () => {
    console.log('Server running on port 8080...');
    
})