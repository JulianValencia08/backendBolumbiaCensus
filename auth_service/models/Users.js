// Import necessary libraries
const moongose = require("mongoose"); 

// Create moongose Schema
const Schema = moongose.Schema;

// Create User Schema
const UserSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direction: {
        type: String,
        required: true
    },    
    cfn: {
        type: String,
        required: true
    }, 
    ecn: {
        type: String,
        required: true
    },
}); 

// Export User Schema
const User = moongose.model("Users", UserSchema);
module.exports = { User }