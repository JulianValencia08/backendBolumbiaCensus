const fs = require("fs");
const jwt = require("jsonwebtoken");
const path = require("path");

const pathToKey = path.join(__dirname, "..", "keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const verifyJwt = (token) => { 
    try { 
        const verification = jwt.verify(token, PUB_KEY, { algorithms: ["RS256"] });
        return { isValidToken: true, verification };
    } catch (err) { 
        console.log("Error in verifyJwt: ", err);
        return false;
    }
} 

module.exports = { verifyJwt };