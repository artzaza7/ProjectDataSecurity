const CryptoJS = require('crypto-js');
const secretKey = process.env.SECRET_KEY;

function encryption(plaintext) {
    const encryptedData = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
    return encryptedData
}

function decryption(encryptedData) {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData
}

module.exports = { encryption, decryption };