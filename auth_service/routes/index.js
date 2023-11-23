const express = require("express")
const router = express.Router()
const { authRouter } = require("./authRoutes")

router.use("/api/v1/auth", authRouter);

module.exports = { router };