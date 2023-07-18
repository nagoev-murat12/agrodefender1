export default function authHeader() {
    return { Authorization: 'Bearer ' + localStorage.getItem('jwt') };
    // if (user && user.accessToken) {

    // return { Authorization: 'Bearer ' + localStorage.getItem('user') };
    // } else {
    //   return {};
    // }
  }
  