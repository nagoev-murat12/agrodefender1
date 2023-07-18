import axios from "axios";
export default axios.create({
  


  baseURL: "http://31.41.63.47:4200/",

  headers: {
    "Content-Type": "form-data", 
    "Content-type": "application/json",
    Accept: 'application/json',
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    
  },
    body: JSON.stringify()
});
