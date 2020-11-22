import fetch from "node-fetch";
import axios from "axios";
export async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getData(url = "", params = {}) {
  const response = await axios.get(url, {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    params,
  });
  return response.data;
}
