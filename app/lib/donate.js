/**
 * This file provides async functions for TC API calls and CiviCRM updates
 *
 * It contains the following functions:
 * 
 * async function TCGetBillingID(paymentInfo)
 * 
 * async function CiviStoreBillingID(contactID, billingID)
 * 
 * async function CiviStoreLastFour(contactID, digits)
 * 
 * async function CiviCreateContribution(contactID, entity, params)
 * 
 */

 // tony's way of doing requests
const resp = await fetch('https://cas.fsf.org/login', {
  method: 'POST',
  redirect: 'error',
  credentials: 'include',
  body: formData,
});


/**
 * Get BillingID for this CCN from Go backend
 *
 * @param ccInfo in the following format:
    {
      "name": "John Smith",
      "cc": "4111111111111111",
      "exp": "0404",
      "zip": "90000"
    }
 *
 * @return a Promise that resolves to a six-digit alphanumeric BillingID
 */
async function getBillingID(ccInfo) {
  const resp = await fetch("http://fsfmobile0p.fsf.org:8080/payment/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },

    
    body: ccInfo
  });

  if (resp.status >= 400) {
    return Promise.reject(new Error('Failed to complete TC request and get billing ID'));
  }

  return resp.json();
}

async function CiviStoreBillingID(contactID, billingID) {

}

async function CiviStoreLastFour(contactID, digits) {

}

async function CiviCreateContribution(contactID, entity, params) {

}
