URL = "http://fsfmobile0p.fsf.org:3000";
// URL = "http://localhost:3000";
// URL = "https://api.kanye.rest/";
// TODO: LOGIN_URL is a hack since go backend is on a different port
LOGIN_URL = "http://fsfmobile0p.fsf.org:8080";

export const networkSettings = {
  env: process.env.NODE_ENV,
  URL,
  LOGIN_URL
};

export default networkSettings;
