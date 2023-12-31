import axios from "axios";

// const serverUrl = "http://192.168.0.30:3001/"; // locahost : workspaces laptop
const serverUrl = "http://15.164.215.123:3001/"; // t3.large ec2 server
// const serverUrl = "http://localhost:3001/"; // t3.large ec2 server

async function get(endpoint, params = "") {
  return await axios.get(serverUrl + endpoint + "/" + params, {
    // Send jwt token in header
    headers: {
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// post method request with JSON.stringify()
async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

async function postData(endpoint, data) {
  return axios.post(serverUrl + endpoint, data, {
    headers: {
      "Content-Type": "multipart/form-data; boundary=myBoundary",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

// put method request with JSON.stringify()
async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

/**
 * Q) why is the function name "del", not a "delete?"
 *
 * "delete" is reserved keyword of JavaScript language
 * so, use "del" first, and alias to "delete" when export it
 */
async function del(endpoint, params = "", data = {}) {
  return axios.delete(serverUrl + endpoint + "/" + params, {
    data,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
    },
  });
}

/**
 * now we can use those methods like this :
 * api.get(), api.post(), api.put(), api.del
 *
 * if i want to request with post method to "/user/signin", with userInfo data:
 * api.post("/user/signin", userInfo) will work
 */
export { get, post, postData, put, del as delete };
