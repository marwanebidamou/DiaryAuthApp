import express, { Application } from 'express';
import connectDB from './config/db.config';
import { PORT } from './config/env.config';
import { CreateDiary } from './services/diary.service';
import morgan from 'morgan';
import authRouter from './routes/auth.routes';

const app: Application = express();

//Logging using morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


app.use(express.json()); // For parsing JSON requests


app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send("GET Request Called")
})


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => console.error("An error occuring when attempting to connect to mongodb database"));