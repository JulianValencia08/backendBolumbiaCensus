const cripto = require('crypto');
const fs = require('fs');

function genKeyPar(){
    const keyPair = cripto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    });
    fs.writeFileSync(__dirname.replace("/utils", "") + '/keys/id_rsa_pub.pem', keyPair.publicKey);
    fs.writeFileSync(__dirname.replace("/utils", "") + '/keys/id_rsa_priv.pem', keyPair.privateKey);
    
}

genKeyPar();
console.log('keys generated');
