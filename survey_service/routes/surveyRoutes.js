const express = require("express");
const { firstPersonAnswersController, otherPersonAnswersController } = require("../controllers/surveyControllers");
const surveyRouter = express.Router();
const { validateToken } = require("../middlewares/surveyMiddleware")


// Falta el middleware de auth
surveyRouter.post("/first-person-answers", validateToken, firstPersonAnswersController);
surveyRouter.post("/other-person-answers", otherPersonAnswersController);

module.exports =  { surveyRouter };