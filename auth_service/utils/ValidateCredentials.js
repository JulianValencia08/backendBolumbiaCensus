const validateLoginCredential = (ecn, cfn) => {
    const validCredentials = validateCFN(cfn) && validateECN(ecn);
    return validCredentials;
} 

const validateCFN = (cfn) => {
    if(cfn.length != 13) return false;
    if(cfn[7] != cfn[cfn.length - 1]) return false;
    return true;
}

const validateECN = (ecn) => {
    if (ecn.length != 12) return false;
    return true;
}


module.exports = { validateLoginCredential };