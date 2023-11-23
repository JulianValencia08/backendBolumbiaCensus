const express = require("express")
const router = express.Router()
const { surveyRouter } = require("./surveyRoutes")

router.use("/api/v1/survey", surveyRouter);

module.exports = { router };