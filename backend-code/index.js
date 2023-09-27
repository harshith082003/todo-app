const express = require("express");

const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const app = express();

mongoose
    .connect("mongodb://127.0.0.1:27017", 
    {
        dbName: "backend"
    })
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))
    
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.urlencoded( { extended: true } ));
app.use(cookieParser());

const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;

    if(token){

        const decoded = jwt.verify(token, "asdadsf");
        req.user = await User.findById(decoded._id);

        next();
    } else {
        res.redirect("login");
    }

}
app.get('/', isAuthenticated, (req, res) => {

    res.render("logout", {name: req.user.name});

})
app.get('/register', (req, res) => {
    res.render("register");

})
app.get('/login', (req, res) => {
    res.render("login");

})

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let user = await User.findOne({email});
    if(!user) return res.redirect('register')

    const match = await bcrypt.compare(password, user.password);

    if(!match) return res.render('login', {message: "Incorrect Password"})

    const token = jwt.sign({_id: user._id}, 'asdadsf');

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60*1000),
    });
    res.redirect("/")
})

app.post('/register', async (req, res) => {

    const {name, email, password} = req.body;

    const newUser = await User.findOne({email});
    if(newUser){
        res.redirect("login")
        return;
    }

    const hashedpwd = await bcrypt.hash(password, 10);
    const user = await User.create({
        name, 
        email, 
        password: hashedpwd
    });

    const token = jwt.sign({_id: user._id}, 'asdadsf');

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60*1000),
    });
    res.redirect("/")
})

app.get('/logout', async (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/")
})




app.listen(PORT, () => console.log(`Running at PORT:${PORT}`));