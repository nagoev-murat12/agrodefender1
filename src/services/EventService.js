
import http from "../services/http-common"

export default {
  async getEvents() {
    let res = await http.get("http://31.41.63.47:4200/events");
    return res.data;
  },
  async getEventSingle(id) {
    // let  res = await http.get("http://31.41.63.47:4200/eventsingle/" + id, {responseType: 'json'} );
    // return res.data;
  // http.get("http://31.41.63.47:4200/eventsingle/${selectedValue}",{responseType: 'json'} )
  // .then(response => {
    // const events = response.data;
    // events.forEach(id => {
    //   console.log(id); // Output: "New York", "San Francisco"
    // });
    const url = `http://31.41.63.47:4200/eventsingle/${id}`;

  let res = await http.get(url, { responseType: 'json' });

  return res.data;
    // response.json()
  // });
  }
}