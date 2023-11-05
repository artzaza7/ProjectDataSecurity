const crypto = require('crypto');
const secretKey = process.env.SECRET_KEY;

function encrypt(text) {
    try {
        const cipher = crypto.createCipher('aes-256-cbc', secretKey);
        let encryptedText = cipher.update(text, 'utf8', 'hex');
        encryptedText += cipher.final('hex');
        return encryptedText;
    } catch (error) {
        console.error('Error during decryption:', error);
        return text;
    }
}

function decrypt(encryptedText) {
    try {
        const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
        let decryptedText = decipher.update(encryptedText, 'hex', 'utf8');
        decryptedText += decipher.final('utf8');
        return decryptedText;
    } catch (error) {
        console.error('Error during decryption:', error);
        return encryptedText;
    }
}

module.exports = { encrypt, decrypt };
