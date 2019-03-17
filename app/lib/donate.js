import { AsyncStorage } from "react-native";

/**
 * This file provides async functions for TC API calls and CiviCRM updates
 *
 * It contains the following functions:
 * 
 * async function TCGetBillingID(paymentInfo)
 * 
 * async function TCSinglePayment(paymentInfo)
 * 
 * async function TCRepeatablePayment(paymentInfo)
 * 
 * async function storeBillingID(billingID)
 * 
 * async function storeLastFour(digits)
 * 
 * async function storeCardholder(name)
 * 
 * async function getSavedBillingID()
 * 
 * async function getSavedLastFour()
 * 
 * async function getCardholder()
 * 
 *  ---- the last four should be replaced with the following for CiviCRM integration next semester ----
 * 
 * async function CiviStoreBillingID(contactID, billingID)
 * 
 * async function CiviStoreLastFour(contactID, digits)
 * 
 * async function CiviGetBillingID(contactID)
 * 
 * async function CiviGetLastFour(contactID)
 * 
 * async function CiviCreateContribution(contactID, entity, params)
 * 
 */

/**
 * Get BillingID for this CCN from Go backend
 *
 * @param ccInfo in the following format:
 * {
    "name": "John Smith",
    "cc": "4111111111111111",
    "exp": "0404",
    "zip": "90000"
    }
 *
 * @return a Promise that resolves to a JSON object containing a six-digit alphanumeric BillingID
 * {
      "billingid": "Q4BLAU"
    }
 */
async function TCGetBillingID(paymentInfo) {
  const resp = await fetch("http://fsfmobile0p.fsf.org:8080/payment/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentInfo)
  });

  if (resp.status >= 400) {
    return Promise.reject(new Error('Failed to complete TC request and get billing ID'));
  }

  return resp.json();
}

/**
 * API Call for a single payment to Go backend 
 *
 * note: "amount" should be a string, pad with "00" for cents
 * @param paymentInfo in the following format:
 * {
    "name": "John Smith",
    "cc": "4111111111111111",
    "exp": "0404",
    "amount": "2000"
    }
 * 
 * @return a Promise that resolves to JSON object containing transaction info
 *  {
      "transid": "a transaction id from TrustCommerce",
      "status": "status of transaction { approved, declined, baddata, error }"
      "authcode": "auth code for the transaction"
    }
 */
async function TCSinglePayment(paymentInfo) {
  const resp = await fetch("http://fsfmobile0p.fsf.org:8080/payment/pay", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentInfo)
  });
  try {
    if (resp.status >= 400) {
      return Promise.reject(new Error('Call to TC for single payment returned status code >= 400'));
    }
  
    return resp.json();
  } catch(error) {
    return Promise.reject(new Error('Failed to complete call for TC for single payment'));
    
  }
  
}

/**
 * API Call for a repeatable payment to Go backend 
 *
 * note: "amount" should be a string, pad with "00" for cents
 * @param paymentInfo in the following format:
 * {
    "billingid": "Q4BLAU",
    "amount": "2000"
    }
 *
 * @return a Promise that resolves to JSON object containing transaction info
 *  {
    "transid": "a transaction id from TrustCommerce",
    "status": "status of transaction { approved, declined, baddata, error }"
    "authcode": "auth code for the transaction"
  }
 */
async function TCRepeatablePayment(paymentInfo) {
  const resp = await fetch("http://fsfmobile0p.fsf.org:8080/payment/repeat_pay", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(paymentInfo)
  });

  if (resp.status >= 400) {
    return Promise.reject(new Error('Failed to complete call to TC for repeatable donation'));
  }

  return resp.json();
}

/** TEMP SOLUTION (may move to Rails BE, or store to CiviCRM)
 *  - store billingID and last four digits of related CCN to AsyncStorage
 */

/**
 * @param billingID: six-digit alphanumeric BillingID
 */
async function storeBillingID(billingID) {
  console.log(billingID);
  try {
    await AsyncStorage.setItem('billingID', billingID);
  } catch (error) {
    console.log("Unexpected error: Failure to save Billing ID to AsyncStorage")
    console.log(error);
  }
}

/**
 * @param digits: last four digits of CCN
 */
async function storeLastFour(digits) {
  try {
    await AsyncStorage.setItem('lastFour', digits);
  } catch (error) {
    console.log("Unexpected error: Failure to save CC digits to AsyncStorage")
    console.log(error);
  }
}

/**
 * @param name: cardholder name associated with saved card
 */
async function storeCardholder(name) {
  try {
    await AsyncStorage.setItem('cardholder', name);
  } catch (error) {
    console.log("Unexpected error: Failure to save CC digits to AsyncStorage")
    console.log(error);
  }
}

/**
 * @return a Promise that resolves to the stored six-digit alphanumeric BillingID, or null
 */
async function getSavedBillingID() {
  try {
    const billingID = await AsyncStorage.getItem('billingID');
    return billingID;
  } catch (error) {
    return null;
  }
};

/**
 * @return a Promise that resolves to the stored last four digits of CCN tied to BillingID
 */
async function getSavedLastFour() {
  try {
    const lastFour = await AsyncStorage.getItem('lastFour');
    return lastFour;
  } catch (error) {
    return Promise.reject(new Error("CC digits not found"));
  }
};

/**
 * @return a Promise that resolves to the cardholder name associated with saved card
 */
async function getCardholder() {
  try {
    const name = await AsyncStorage.getItem('cardholder');
    return name;
  } catch (error) {
    return Promise.reject(new Error("No cardholder name saved"));
  }
};

/**
* 11/28 [TABLED] decided not to integrate CiviCRM for FA'18 MVP
*
* Note: the billing_id is saved as a custom field, custom_324 in crmserver3d.org; 
* This is because I literally created the custom field to save it.
* Not sure if there's a better way, or if FSF will have to customize these
* CiviCRM calls here to create on the correctly numbered custom field.
*
*/
async function CiviStoreBillingID(contactID, billingID) {
  console.log(billingID);
}


/* 11/28 [TABLED] decided not to integrate CiviCRM for FA'18 MVP */
async function CiviStoreLastFour(contactID, digits) {

}

/**
 * 11/28 [TABLED] decided not to integrate CiviCRM for FA'18 MVP
 * 
 * Passing query params with "fetch" is not a nice built-in
 * https://github.com/github/fetch/issues/256 will help
 *
 */
async function CiviGetBillingID(contactID) {
  let civiJSON = {
    "sequential": 1,
    "return": "custom_324",
    "id": contactID
  };

  let civiInfo = {
    entity: "Contact",
    action: "get",
    api_key: 1234,
    site_key: "secret", //cannot legally commit this
    json: JSON.stringify(civiJSON)
  };

  console.log(contactID);
  // doesn't work rn lol, see comment above function
  const resp = await fetch("https://crmserver3d.fsf.org/sites/all/modules/civicrm/extern/rest.php", {
    method: "GET",
    params: JSON.stringify(civiInfo)
  });

  console.log(resp.json());
}

/* 11/28 [TABLED] decided not to integrate CiviCRM for FA'18 MVP */
async function CiviGetLastFour(contactID) {
  console.log(contactID);
}

/* 11/28 [TABLED] Needed to maintain synchronization and updates to CiviCRM */
async function CiviCreateContribution(contactID, entity, params) {

}

export {
  TCGetBillingID,
  TCSinglePayment,
  TCRepeatablePayment,
  // CiviStoreBillingID,
  // CiviStoreLastFour,
  // CiviGetBillingID,
  // CiviGetLastFour,
  // CiviCreateContribution,
  storeBillingID,
  storeLastFour,
  storeCardholder,
  getSavedBillingID,
  getSavedLastFour,
  getCardholder,
};