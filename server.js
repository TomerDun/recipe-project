import express from 'express'
import { recipeRouter } from './routes/recipeRouter.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/recipes', recipeRouter);


app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server running on port 8080...');
    
})