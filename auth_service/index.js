const express = require("express");
const connectDB = require("./database/DataBaseConfig");
const cors = require("cors");
const { router } = require("./routes/index");
const passport = require("passport");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

require('./config/PassportConfig')(passport);
app.use(passport.initialize());

connectDB();

app.use(router);

app.listen(process.env.PORT || 3000, () => { 
    console.log(`Server running on port ${process.env.PORT || 3000 }`);
});

