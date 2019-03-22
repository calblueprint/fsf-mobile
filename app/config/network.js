import { Platform } from 'react-native';

URL = "http://fsfmobile0p.fsf.org:3000";
// TODO: LOGIN_URL is a hack since go backend is on a different port
LOGIN_URL = "http://fsfmobile0p.fsf.org:8080";

export const networkSettings = {
  env: process.env.NODE_ENV,
  URL,
  LOGIN_URL
};

export default networkSettings;
