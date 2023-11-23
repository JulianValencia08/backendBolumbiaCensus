const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const pathToKey = path.join(__dirname, "..", "keys", "id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");

function issueJWT(user){
    const _id = user.id;
    const cfn = user.cfn;
    const ecn = user.ecn;
    const expiresIn = '1d';
    const payload = { 
        sub: _id,
        ecn: ecn,
        iat: Date.now(),
    };
    const signedToken = jwt.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: 'RS256' });
    return {  
        token: "Bearer " + signedToken,
        expires: expiresIn,
    }
}

module.exports = { issueJWT };