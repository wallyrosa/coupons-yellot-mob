import axios from "axios";

export const apiYellot = axios.create({
  baseURL: "https://api.yellotmob.com.br",
});
