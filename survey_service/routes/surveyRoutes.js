const express = require("express");
const {firstPersonAnswersController, otherPersonAnswersController, formInformation } = require("../controllers/surveyControllers");
const surveyRouter = express.Router();
const { validateToken } = require("../middlewares/surveyMiddleware")


// Falta el middleware de auth
surveyRouter.post("/first-person-answers", validateToken, firstPersonAnswersController);
surveyRouter.post("/other-person-answers", otherPersonAnswersController);
surveyRouter.get("/helper-desk", formInformation)

module.exports =  { surveyRouter };