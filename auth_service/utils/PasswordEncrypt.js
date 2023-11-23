const crypto = require("crypto");
const fs = require("fs");
const path = require("path");


const pathToKey = path.join(__dirname, "..", "keys", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
const PRIV_KEY = fs.readFileSync(path.join(__dirname, "..", "keys", "id_rsa_priv.pem"), "utf8");


const validateCredentials = (ecn) => {
    const decryptedEcn = decryptStringWithRsaPrivateKey(ecn);
    return (decryptedEcn === ecn);
}

const generateEncryptedCredentials = (ecn) => {
    const buffer = Buffer.from(ecn, 'utf8');
    try {
        const encrypted = crypto.publicEncrypt({ key: PUB_KEY, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
        return encrypted.toString("base64");
    } catch (error) {
        console.error('Error during encryption:', error);
        throw error; // Handle or log the error as needed
    }
};

const decryptStringWithRsaPrivateKey = (ecn) => {
    const buffer = Buffer.from(ecn, "base64");
    try {
        const decrypted = crypto.privateDecrypt({ key: PRIV_KEY, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING }, buffer);
        return decrypted.toString("utf8");
    } catch (error) {
        console.error('Error during decryption:', error);
        throw error; // Handle or log the error as needed
    }
};


module.exports = { generateEncryptedCredentials, validateCredentials };