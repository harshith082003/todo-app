const express = require('express');
const cookiePaser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routes/users');
const taskRouter = require('./routes/task');
const connectDB = require('./data/database');
const { config } = require('dotenv');
const { errorMiddleware } = require('./middleware/error');
const app = express();

config({
    path: "./data/config.env"
})

connectDB();

app.use(express.json());
app.use(cookiePaser());
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tasks', taskRouter);

app.get('/', (req, res) => {
    res.send("Yen samachara?");
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Server running on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});