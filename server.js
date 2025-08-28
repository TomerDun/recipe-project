import express from 'express'
import { recipeRouter } from './routes/recipeRouter.js';
import { errorHandler } from './middleware/errorHandler.js';
import morgan from 'morgan';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.use('/recipes', recipeRouter);


app.use(errorHandler);

app.listen(8080, () => {
    console.log('Server running on port 8080...');
    
})