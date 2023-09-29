const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.json())
 
mongoose
    .connect("mongodb://127.0.0.1:27017", 
    {
        dbName: "api"
    })
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", userSchema);
    
app.get('/', (req, res) => {
    res.send("Yen samachara?");
});

app.get('/users/all', async (req, res) => {
    const users = await User.find({});

    res.json({
        success: true,
        users,
    });
});

app.post('/users/new', async (req, res) => {

    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    res.status(201).json({
        success: true,
        message: "Registered successfully",
    });
});

app.listen(4000, () => {
    console.log("Server running");
});