const express = require('express');
const userRouter = require('./routes/users');
const connectDB = require('./data/database');
const { config } = require('dotenv')
const app = express();

config({
    path: "./data/config.env"
})

connectDB();

app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.send("Yen samachara?");
});

app.listen(process.env.PORT, () => {
    console.log("Server running");
});