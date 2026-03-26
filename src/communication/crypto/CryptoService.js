import CryptoJS from 'crypto-js';
import { env } from '../../env';

class CryptoService {
    constructor() {
        this.passphrase = env.crypto.passphrase;
    }

    encrypt( data ) {
        return CryptoJS.AES.encrypt(data, this.passphrase).toString();
    }

    decrypt( data ) {
        const bytes = CryptoJS.AES.decrypt(data, this.passphrase);
        return bytes.toString(CryptoJS.enc.Utf8);
    }
}

export default new CryptoService();