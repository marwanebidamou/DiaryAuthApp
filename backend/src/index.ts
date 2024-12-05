import express, { Application } from 'express';

const app: Application = express();

app.use(express.json()); // For parsing JSON requests


app.get('/', (req, res) => {
    res.send("GET Request Called")
})


app.listen(5000, () => {
    console.log(`Server running on http://localhost:${5000}`);
});