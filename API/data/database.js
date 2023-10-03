const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, 
    {
        dbName: "first"
    })
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))

}

module.exports = connectDB;