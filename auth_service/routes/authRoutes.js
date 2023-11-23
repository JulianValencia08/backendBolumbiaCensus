const express = require("express");
const { loginController, registerController, validateTokenController } = require("../controllers/authController");
const authRouter = express.Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.get("/validateToken",  validateTokenController);

module.exports =  { authRouter };