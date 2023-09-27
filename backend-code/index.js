const express = require("express");

const PORT = process.env.PORT || 5000;


const app = express();


app.set("view engine", "ejs");

app.use(express.static("public"))
app.use(express.urlencoded( { extended: true } ));

app.get('/', (req, res) => {
    res.render("index", {name: "ninu"});
})

app.post('/', (req, res) => {
    console.log(req.body);
})


app.listen(PORT, () => console.log(`Running at PORT:${PORT}`));