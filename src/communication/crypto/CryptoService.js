import crypto from 'crypto';
import { env } from '../../env';

class CryptoService {
    constructor() {
        this.alg = env.crypto.alg;
        this.passphrase = env.crypto.passphrase;
        
        this.cipher = crypto.createCipher( this.alg, this.passphrase );
        this.decipher = crypto.createDecipher( this.alg, this.passphrase );
    }

    encrypt( data ) {
        const crypted = this.cipher.update( data, 'utf8', 'hex' );
        return crypted + this.cipher.final( 'hex' );
    }

    decrypt( data ) {
        const decrypted = this.decipher.update( data, 'hex', 'utf8' );
        return decrypted + this.decipher.final( 'utf8' );
    }
}

export default new CryptoService();