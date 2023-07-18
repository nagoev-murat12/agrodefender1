import axios from "axios";

const instance = axios.create({
  baseURL: "http://31.41.63.47:4200/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  },
});

export default instance;
