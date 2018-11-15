/**
 * This file provides async function for CAS and CiviCRM login
 *
 * It contains the following functions:
 *
 * async function getLoginTicket()
 *
 * async function casLogin(email, password, loginTicket)
 *
 * async function getCiviCRMApiKey(serviceTicket)
 *
 */

import { AsyncStorage } from "react-native"

/**
 * getLoginTicket talks to CAS and returns a string
 *
 * @return a Promise that resolves to a string
 */
async function getLoginTicket() {
  const resp = await fetch(
    'https://cas.fsf.org/login?service=https%3A%2F%2Fcrmserver3d.fsf.org%2Fassociate%2Faccount',
  );
  if (!resp.ok) {
    return Promise.reject(new Error('Server error when getting login token'));
  }

  const ticketRegex = /"LT-[^"]*"/g;
  const match = ticketRegex.exec(await resp.text());

  if (match == null) {
    console.log(await resp.text());
    return Promise.reject(
      new Error('Did not find a LT- match in CAS login page. Already logged in?'),
    );
  }
  return match[0].replace(/"/g, '');
}

/**
 * casLogin returns the service token based on the login info
 *
 * @param email: a string as username used for CAS
 * @param password: a string as password of this user
 * @param loginTicket: a string as a fresh login ticket
 *
 * @return a Promise that resolves to a service token string
 */
async function casLogin(email, password, loginTicket) {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  formData.append('lt', loginTicket);
  formData.append('service', 'https://crmserver3d.fsf.org/associate/account');

  const resp = await fetch('https://cas.fsf.org/login', {
    method: 'POST',
    redirect: 'error',
    credentials: 'include',
    body: formData,
  });

  if (resp.status >= 400) {
    console.log(resp.status);
    console.log(loginTicket);
    console.log(formData);
    return Promise.reject(new Error('Login failed or server error'));
  }

  if (resp.status == 200) {
    // react has followed redirect here
    // it might be a bug in react native that redirect: error is not working
    const ticketRegex = /ST-[^&]*&/g;
    const body = (await resp.text()).replace(/&amp;/g, '&');
    const match = ticketRegex.exec(body);

    if (match != null) {
      return match[0].substring(0, match[0].length - 1);
    }
  } else if (resp.status > 300) {
    // look at Location header in HTTP 303 case
    const { headers } = resp.headers;
    if (headers.has('Location')) {
      const url = headers.get('Location');
      const ticketRegex = /ST-[^&]*/g;
      const match = ticketRegex.exec(url);
      if (match != null) {
        return match[0];
      }
    }
  }

  // none of above
  return Promise.reject(new Error('Did not find Service Token in response'));
}

/**
 * Talk to the persistent login backend to get the CiviCRM api key for the user
 *
 * @param serviceTicket: string
 *
 * @return a Promise that resolves to a string API key
 */
async function getCiviCRMApiKey(serviceTicket) {
  const resp = await fetch('http://fsfmobile0p.fsf.org:8080/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      st: serviceTicket,
    }),
  });

  if (resp.status >= 400) {
    return Promise.reject(new Error('Failed to get CiviCRM api key'));
  }

  return resp.json();
}

/**
 * @return a Promise that resolves to a string as the stored api key
 */
async function getStoredApiKey() {
  try {
    const key = await AsyncStorage.getItem('apikey');
    if (key != null) {
      return key
    } else {
      return Promise.reject(new Error("API Key not found"));
    }
  } catch (error) {
    return Promise.reject(new Error("API Key not found"));
  }
};

/**
 * @return a Promise that resolves to a string as the stored user id
 */
async function getStoredId() {
  try {
    const id = await AsyncStorage.getItem('id');
    if (id != null) {
      return id
    } else {
      return Promise.reject(new Error("User Id not found"));
    }
  } catch (error) {
    return Promise.reject(new Error("User Id not found"));
  }
};

/**
 * @param key: a string of api key to store
 */
async function storeApiKey(key) {
  try {
    await AsyncStorage.setItem('apikey', key);
  } catch (error) {
    console.log("Unexpected: fail to save to async storage")
    console.log(error);
  }
}

/**
 * @param id: a string of user id to store
 */
async function storeId(id) {
  try {
    await AsyncStorage.setItem('id', id);
  } catch (error) {
    console.log("Unexpected: fail to save to async storage")
    console.log(error);
  }
}

export {
  getLoginTicket, casLogin, getCiviCRMApiKey, storeApiKey,
  storeId, getStoredApiKey, getStoredId
};
