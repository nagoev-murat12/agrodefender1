<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegister">
        <div v-if="!successful">
          <div class="form-group">
            <label for="username">Login</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
            <label for="name">ФИО</label>
            <input
              v-model="user.name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="name"
            />
            <label for="experience">Стаж работы</label>  <!--Прикрепить копию трудовой книги-->
            <UploadImage></UploadImage>

            <input
              v-model="user.experience"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="experience"
            />
            <label for="education">Образование</label> <!--Прикрепить скан диплома-->
            <UploadImage></UploadImage>

            <input
              v-model="user.education"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="education"
            />
            <label for="degree">Степень</label> <!--Прикрепить скан диплома-->
            <UploadImage></UploadImage>
            <input
              v-model="user.degree"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="degree"
            />
            <label for="expertculture">Вид культуры</label> <!--Выпадающий список-->
            <input
              v-model="user.expertculture"
              v-validate="'required|min:3|max:20'"
              type="text"
              list="expertculture"
              class="form-control"
              name="expertculture"
            />
            <datalist id="expertculture" class="dropdown-menu">
          <option value="Куруза"></option>
          <option value="Яблоки"></option>
          <option value="Пшеница"></option>
          <option value="Рожь"></option>
          <option value="Ячмень "></option>
          <option value="Овес"></option>
          <option value="Сорго"></option>
          <option value="Просо"></option>
          <option value="Горох"></option>
          <option value="Фасоль"></option>
          <option value="Подсолнечник"></option>
          <option value="Соя "></option>
          <option value="Рапс"></option>
          <option value="Горчица"></option>
          <option value="Картофель"></option>
          <option value="Томаты"></option>
          <option value="Огурцы"></option>
          <option value="Виноград"></option>
          <option value="Огурцы"></option>
          <option value="Грушы"></option>
        </datalist>
            <div
              v-if="submitted && errors.has('username')"
              class="alert-danger"
            >{{errors.first('username')}}</div>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="user.email"
              v-validate="'required|email|max:50'"
              type="email"
              class="form-control"
              name="email"
            />
            <div
              v-if="submitted && errors.has('email')"
              class="alert-danger"
            >{{errors.first('email')}}</div>
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input
              v-model="user.password"
              v-validate="'required|min:6|max:40'"
              type="password"
              class="form-control"
              name="password"
            />
            <div
              v-if="submitted && errors.has('password')"
              class="alert-danger"
            >{{errors.first('password')}}</div>
          </div>
          
          <div>
           <label for="checkbox">Согласие на обработку персональных данных</label>
            <input 
             v-model="user.agreement"
             type="checkbox"
             id="checkbox"
             name="checkbox"
             >
             <label for="checkbox">Согласие с пользовательским соглашением</label>
            <input 
             v-model="user.agreement1"
             type="checkbox"
             id="checkbox"
             name="checkbox"
             >
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Зарегистрироваться</button>
          </div>
        </div>
      </form>

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import User from '../models/user';
import UploadImage from '../components/UploadImage.vue'
export default {
  name: 'RegisterView',
  components: {
    UploadImage
  },
  data() {
    return {
      user: new User('', '', ''),
      submitted: false,
      successful: false,
      message: ''
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/expertregister', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
              this.$router.push('/login'); //редирект работает
            },
            error => {
              this.message =
                (error.response && error.response.data) ||
                error.message ||
                error.toString();
              this.successful = false;
            }
          );
        }
      });
    }
  }
};
</script>