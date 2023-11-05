import CryptoJS from "crypto-js";
const secretKey = process.env.REACT_APP_SECRET_KEY;

const encryption = (plaintext) => {
    const encryptedData = CryptoJS.AES.encrypt(plaintext, secretKey).toString();
    return encryptedData;
}

const decryption = (encryptedData) => {
    const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedData;
}

export { encryption, decryption }