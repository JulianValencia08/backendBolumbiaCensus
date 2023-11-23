const fs = require('fs');
const path = require('path');
const { User } = require('../models/Users');
const { ExtractJwt, Strategy } = require("passport-jwt"); 


// Reading the public key from the file .pem
const pathToKey = path.join(__dirname, '..', "keys", 'id_rsa_pub.pem');
const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');

// Function to search an user in the db
function searchUser(jwt_payload, done) {
    console.log('payload received', jwt_payload.sub);
    User.findOne( { id: jwt_payload.sub } )
        .then(user => {
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        })
        .catch(err => done(err, null));
}

// Options for the strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ['RS256'],
}

const strategy = new Strategy(options, searchUser);

module.exports = (passport) => { 
    passport.use(strategy);
}