import API from './API';
import AuthRouter from '../communication/routers/AuthTokenRouter';
import { env } from '../env';

export default new AuthRouter( API, {login: env.auth.loginPath, logout: env.auth.logoutPath} );