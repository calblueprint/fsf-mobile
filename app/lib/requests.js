import networkSettings from "../config/network";

/**
 * Request function for POST, PUT, DELETE requests. (doesn't catch error. used for batch)
 * @param type - request type
 * @param route - request route
 * @param successFunc - success handler
 * @param errorFunc - error handler
 * @param params - body params
 */
function requestNoCatch(type, route, successFunc, errorFunc, params = null) {
  let host = networkSettings.URL;
  console.log(
    "Sending " + type + " request to host: " + host + " at route: " + route
  );
  var requestData = {
    method: type,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  };
  if (type != "GET") {
    requestData.body = JSON.stringify(params);
  }
  return fetch(`${host}${route}`, requestData).then(function(response) {
    if (response.ok) {
      return response.json().then(function(object) {
        return successFunc(object);
      });
    } else {
      return response.json().then(function(error) {
        return errorFunc(error);
      });
    }
  });
}

/**
 * Request function for POST, PUT, DELETE requests.
 * @param type - request type
 * @param route - request route
 * @param successFunc - success handler
 * @param errorFunc - error handler
 * @param params - body params
 */
function request(type, route, successFunc, errorFunc, params = null) {
  return requestNoCatch(type, route, successFunc, errorFunc, params).catch(
    function(error) {
      errorFunc(error);
      console.log(error);
    }
  );
}

/**
 * Request function for GET requests. Same params as request except doesn't take in type and:
 * @param params - URL query params
 */
function getRequest(route, successFunc, errorFunc, params = null) {
  return request("GET", route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for POST request.
 */
function postRequest(route, successFunc, errorFunc, params = "{}") {
  return request("POST", route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for POST request with no catch.
 */
function postRequestNoCatch(route, successFunc, errorFunc, params = "{}") {
  return requestNoCatch("POST", route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for PUT request.
 */
function putRequest(route, successFunc, errorFunc, params = "{}") {
  return request("PUT", route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for PUT request with no catch.
 */
function putRequestNoCatch(route, successFunc, errorFunc, params = "{}") {
  return requestNoCatch("PUT", route, successFunc, errorFunc, params);
}

/**
 * Wrapper method for DELETE request.
 */
function deleteRequest(route, successFunc, errorFunc, params = "{}") {
  return request("DELETE", route, successFunc, errorFunc, params);
}

export {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  postRequestNoCatch,
  putRequestNoCatch
};
