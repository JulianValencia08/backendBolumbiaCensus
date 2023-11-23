const express = require("express");
const { loginController, registerController, validateTokenController } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/validateToken",  validateTokenController);

module.exports =  { authRouter };