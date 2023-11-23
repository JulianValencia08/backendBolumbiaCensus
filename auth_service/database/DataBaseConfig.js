const moongose = require("mongoose");
const dotenv = require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/db_users_DoS";

// Connect to MongoDB
const connectDB = async () => {
    moongose.connect(MONGO_URI) 
        .then(() => console.log("MongoDB connected"))
        .catch((error) => {
            console.error("MongoDB not connected", error)
            process.exit(1); 
        })
};

module.exports = connectDB;
