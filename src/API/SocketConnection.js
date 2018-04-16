import Connection from '../communication/connections/Connection';
import { env } from '../env';

export default new Connection(
    env.io.protocol, 
    env.io.host, 
    env.io.port, 
);