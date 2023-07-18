<template>
  <div>
    <h2>Восстановление пароля</h2>
    <form @submit.prevent="resetPassword">
      <label>
        Адрес электронной почты:
        <input type="email" v-model="email">
      </label>
      <button>Отправить</button>
      
    </form>
      <div v-if="message">{{ message }}</div>
  
  </div>
</template>

<script>
import axios from "axios"
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    resetPassword() {
        const data = {
            email: this.email
        }
        axios.post('http://31.41.63.47:4200//reset_password', data, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('jwt')}`

            }
        })
            .then(response => {
                 console.log(response.data) //= 'Ссылка для смены паролея отправлена на ваш Email';
            })
            .catch(error => {
                if(error.response.status === 404) {
                    this.message = 'Пользователь с таким Email не найден'
                } else {
                    this.message = 'Ошибка сервера'
                }
            })
    }
  }
  }

</script>