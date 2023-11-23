const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");

const Schema = moongose.Schema;

const PersonSchema = new Schema({ 
    personNumber: {
        type: Number,
        required: true
    },
    answers: {  
        type: Object,
        default: {}  
    },
});

const SurveySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    houseHoldSize: {
        type: Number, 
        required: true
    }, 
    answersPerson1: {  
        type: Object,
        default: {}  
    },
    ecn: {
        type: String,
        required: true
    },
    responsesOtherPerson: [ PersonSchema ]
});

const Survey = moongose.model("Survey", SurveySchema);
module.exports = { Survey }
