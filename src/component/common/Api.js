import { API_KEY } from "./Constants";

export const GET = (url) =>{
    return fetch(`${url}?access_key=${API_KEY}`).then(ReceiveStream);
}

const ReceiveStream = (res) =>  {
    var jsonResult = res.json();
    return jsonResult;
  }