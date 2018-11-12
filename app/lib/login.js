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

  if (resp.status >= 400 || resp.status < 300) {
    // We expect a HTTP 302/303 redirect here
    // If we get HTTP 200, fetch might have followed the redirect, and we won't
    // get the service token here
    console.log(resp.status);
    console.log(loginTicket);
    console.log(formData);
    return Promise.reject(new Error('Login failed or server error'));
  }

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

  console.log(headers);
  console.log(body);
  return Promise.reject(new Error('Did not find Service Token in response'));
}

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

export { getLoginTicket, casLogin, getCiviCRMApiKey };
