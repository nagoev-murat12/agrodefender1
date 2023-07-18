<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="handleRegistere">
           <div class="form-group">
            <label for="username">Имя</label>
            <input
              v-model="user.first_name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="first_name"
            />
           </div>
             <div class="form-group">
            <label for="username">Фамилия</label>
            <input
              v-model="user.last_name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="last_name"
            />
             <div class="form-group">
            <label for="username">Отчество</label>
            <input
              v-model="user.patronymic"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="patronymic"
            />

          </div>
          <div class="form-group">
            <label for="username">Логин</label>
            <input
              v-model="user.username"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="username"
            />
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
            <label for="checkbox">Вы:
              
            </label>
            <!-- <input 
             v-model="user.checked"
             type="checkbox"
             id="checkbox"
             name="checkbox"
             > -->

              <input type="radio" v-model="user.checked" value="1"  v-on:change="selectedOption = '1'"> Агрозащитник
              <input type="radio" v-model="user.checked" value="0"  v-on:change="selectedOption = '0'"> Фермер
          </div> 
          <div>
            <div v-show="selectedOption === '1'">
            
            <div class="form-group">
					<i class="login__icon fas fa-user"></i>
          <label for="email">Образование</label>
					<input type="text" class="form-control" v-model="user.education" placeholder="Образование">
				</div>
                <div class="form-group">
					<i class="login__icon fas fa-user"></i>
          <label for="email">Степень</label>
					<input type="text" class="form-control" v-model="user.degree" placeholder="Степень">
				</div>
                <div class="login__field">
					<i class="login__icon fas fa-user"></i>
          <label for="email">Стаж работы</label>
					<input type="text" class="form-control" v-model="user.experience" placeholder="Стаж работы">
				</div>
        <div class="login__field">
					<i class="login__icon fas fa-user"></i>
          <label for="email">Специализация</label>
					<input type="text" class="form-control" v-model="user.expertculture" placeholder="Специализация">
				</div>
        </div >
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
            >{{errors.first('password')}}
            </div>
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
// import AnketaView from '../components/AnketaView.vue';

export default {
  name: 'RegisterView',
  components:{
    // AnketaView
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
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegistere() {
      this.message = '';
      this.submitted = true;
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.$store.dispatch('auth/register', this.user).then(
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

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>

