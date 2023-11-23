const { Survey } =  require("../models/Survey");

const firstPersonAnswersController = async (req, res, next) => { 
    const userId = req.userId;
    const { houseHoldSize, firstResponses } = req.body;
    const newSurvey = new Survey({ 
        userId: userId, // Poner el ID del usuario que se obtiene del token
        houseHoldSize: houseHoldSize,
        aswersPerson1: firstResponses,
    });
    newSurvey.save()
        .then((survey) => {
            res.json({  success: true, survey: survey, message: "First person questions" });
        })
        .catch ((err) => { 
            console.log(err);
        });
} 

const otherPersonAnswersController = async (req, res, next) => { 
    const { userId, personNumber, answers } = req.body; 
    Survey.findOne({ userId: userId })
        .then((survey) => {
            if(!survey) res.status(401).json({ success: false, msg: "could not find survey" });
            survey.responsesOtherPerson.push({ personNumber: personNumber, answers: answers });
            survey.save()
                .then((survey) => {
                    res.json({ success: true, survey: survey, message: `Person ${personNumber} questions`  });
                })
                .catch ((err) => { 
                    console.log(err);
                    res.status(500).json({ success: false, msg: "Internal server error" });
                });
        }).catch((err) => {
            console.error(err);
            res.status(500).json({ success: false, msg: "Internal server error" });
        }); 
} 

module.exports = { firstPersonAnswersController, otherPersonAnswersController };