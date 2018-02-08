import Connection from '../communication/connections/Connection';
import Headers from '../communication/headers/StandardJsonHeaders';
import { env } from '../env';

export default new Connection(
    env.api.protocol, 
    env.api.host, 
    env.api.port, 
    new Headers() 
);
