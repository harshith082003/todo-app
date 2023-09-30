const express = require('express');
const cookiePaser = require('cookie-parser');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/task');
const connectDB = require('./data/database');
const { config } = require('dotenv')
const app = express();

config({
    path: "./data/config.env"
})

connectDB();

app.use(express.json());
app.use(cookiePaser());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.get('/', (req, res) => {
    res.send("Yen samachara?");
});

app.listen(process.env.PORT, () => {
    console.log("Server running");
});