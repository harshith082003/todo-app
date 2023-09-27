const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Yen samachara?");
})

app.listen(4000, () => {
    console.log("Server running");
})