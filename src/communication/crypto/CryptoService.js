import crypto from 'crypto';
import { env } from '../../env';

class CryptoService {
    constructor() {
        this.alg = env.crypto.alg;
        this.passphrase = env.crypto.passphrase;
    }

    encrypt( data ) {
        const cipher = crypto.createCipher( this.alg, this.passphrase );
        const crypted = cipher.update( data, 'utf8', 'hex' );
        return crypted + cipher.final( 'hex' );
    }

    decrypt( data ) {
        const decipher = crypto.createDecipher( this.alg, this.passphrase );
        const decrypted = decipher.update( data, 'hex', 'utf8' );
        return decrypted + decipher.final( 'utf8' );
    }
}

export default new CryptoService();