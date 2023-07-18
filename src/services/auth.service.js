import axios from 'axios';

const API_URL = 'http://31.41.63.47:4200/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password,
        checkbox: user.checked

      })
      .then(response => {
        this.userType = response.data.userType
        localStorage.setItem('userType', this.userType)
        if (response.data.access_token) {
          localStorage.setItem('user', JSON.stringify(response.data.access_token));
          localStorage.setItem('jwt', response.data.access_token)
        }
        
        return response.data;
      });
    
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      first_name: user.first_name,
      last_name: user.last_name,
      patronymic: user.patronymic,
      username: user.username,
      email: user.email,
      password: user.password,
      checkbox: user.checked,
      education: user.education,
      degree: user.degree,
      experience: user.experience,
      expertculture: user.expertculture
    });
  }
  // expertregister(user) {
  //   return axios.post(API_URL + 'expertregister', {
  //     username: user.username,
  //     name: user.name,
  //     email: user.email,
  //     password: user.password,
  //     expertculture: user.expertculture,
  //     education: user.education,
  //     experience: user.experience,
  //     degree: user.degree,
  //   });
  // }

  
}

export default new AuthService();
