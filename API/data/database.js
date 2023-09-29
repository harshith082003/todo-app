const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
    .connect(process.env.MONGO_URI, 
    {
        dbName: "api"
    })
    .then(() => console.log("DB connected"))
    .catch(e => console.log(e))

}

module.exports = connectDB;