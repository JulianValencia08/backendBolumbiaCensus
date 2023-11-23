const express = require("express");
const connectDB = require("./database/databaseConfig");
const cors = require("cors");
const { router } = require("./routes/index");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.use(router);

app.listen(process.env.PORT || 3002, () => { 
    console.log(`Server running on port ${process.env.PORT || 3002 }`);
});

