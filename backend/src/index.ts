import express, { Application } from 'express';
import connectDB from './config/db.config';
import { PORT } from './config/env.config';
import { CreateDiary } from './services/diary.service';
import morgan from 'morgan';

const app: Application = express();

//Logging using morgan
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));


app.use(express.json()); // For parsing JSON requests


app.get('/', (req, res) => {
    res.send("GET Request Called")
})

app.get('/testdb', (req, res) => {
    let result = CreateDiary();
    res.send(result);
})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => console.error("An error occuring when attempting to connect to mongodb database"));