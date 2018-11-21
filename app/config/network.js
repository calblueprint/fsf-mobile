import { Platform } from 'react-native'

/**
 * Determines URL based on whether in production or dev environment
 */
if (process.env.NODE_ENV === 'production') {
  console.log('In Production Environment');
  URL = 'https://fsfmobile.fsf.org'
} else {
  console.log('In Staging (Dev) Environment');
  URL = Platform.select({
    // You'll need to change this to your computer's IP/ngrok if using mobile simulator
    ios: "http://localhost:3000",
    android: "http://10.0.2.2:3000"
  });
}

export const networkSettings = {
  env: process.env.NODE_ENV,
  URL,
};

export default networkSettings;
