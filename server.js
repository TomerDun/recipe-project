import express from 'express'
import { recipeRouter } from './routes/recipeRouter.js';
import { errorHandler } from './middleware/errorHandler.js';
import morgan from 'morgan';
import { sequelize } from './db/connection.js';

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'))

// Routes
app.use('/recipes', recipeRouter);


app.use(errorHandler);

async function testDBConnection() {
    try {
        await sequelize.authenticate();
        console.log('🚀 DB connection established...');        
    }
    catch (err) {
        console.log('❌ Error connecting to DB');
        throw new Error(err);
        
    }
}

app.listen(8080, async () => {
    console.log('✈ Server running on port 8080...');
    await testDBConnection();
    
})