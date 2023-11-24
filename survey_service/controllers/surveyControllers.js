const { Survey } =  require("../models/Survey");

const firstPersonAnswersController = async (req, res, next) => { 
    const userId = req.userId;
    const { houseHoldSize, firstResponses, } = req.body;
    const ecn = req.ecn;
    
    console.log("Body", req.body);
    console.log("userId", userId);
    console.log("ecn", ecn);

    const newSurvey = new Survey({ 
        userId: userId, // Poner el ID del usuario que se obtiene del token
        houseHoldSize: houseHoldSize,
        answersPerson1: firstResponses,
        ecn: ecn
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

const formInformation = async (req, res, next) => {
    const ecn = req.body.ecn;
    Survey.findOne({ecn: ecn})
        .then((surveys) => {
            console.log(surveys);
            let answersPerson1 = surveys.answersPerson1
            let responsesOtherPerson = surveys.responsesOtherPerson
            let response = {
               answersPerson1,
               responsesOtherPerson
            }
                res.status(200).send(response);
        })
}

module.exports = { formInformation, firstPersonAnswersController, otherPersonAnswersController };