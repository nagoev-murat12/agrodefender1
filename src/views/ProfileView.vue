<template>
  <div>

  <div class="container">
    <h2 class="data-profile">
      <img src="../assets/icons/person-circle.svg" alt="Bootstrap" width="62" height="62">
      Данные профиля
    </h2>
    <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <p class="sublin">id: {{content.id}}</p>
      <p> Логин: {{content.username}}</p>
      <p>почта: {{content.email}}</p>
      <!--<p>Счет: {{content.email}}</p>
      <p>Баланс: {{content.email}}</p>
      <p>Роботы: {{content.email}}</p>
      <p>Поля: {{content.email}}</p>-->
  </div>

  <div class="prof">
    <p>Имя: {{msg}}</p> 
    
    <input class="otpiti" v-if="inputVisibility" v-model="msg" placeholder="Введите Имя">
    <button @click="persist">Сохранить</button>
  </div>
<div>
        <h2>Добавить поле</h2>
  <div v-for="(cat, n) in cats" :key="cat">
    <p>
      <span class="cat">{{ cat }}</span><br>
      <button class="btn btn-outline-danger" @click="removeCat(n)">Удалить</button>
    </p>
  </div>

  <p>
    <input v-model="newCat" class="test">
    <button @click.prevent="addCat">Добавить поле</button>
  </p>
    </div>
  </div>
</template>
<script>



import UserService from '../services/user.service';

export default {
  name: 'ProfileView',
  data() {
    return {
      content: '',
      msg: '',
      inputVisibility: true,
      cats: [],
      newCat: null
    };
  },
  mounted() {
    if (localStorage.getItem('cats')) {
      try {
        this.cats = JSON.parse(localStorage.getItem('cats'));
      } catch(e) {
        localStorage.removeItem('cats');
      }
    }
    UserService.getUserBoard().then(
      response => {
        this.content = response.data
      },
      error => {
        this.content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
      }
    )
    if (localStorage.msg) {
      this.msg = localStorage.msg
    }
  },
  methods: {
    persist() {
      localStorage.msg = this.msg
      console.log('Имя добавлено')
    },
     addCat() {
      // убедиться, что было что-либо введено
      if (!this.newCat) {
        return;
      }

      this.cats.push(this.newCat);
      this.newCat = '';
      this.saveCats();
    },
    removeCat(x) {
      this.cats.splice(x, 1);
      this.saveCats();
    },
    saveCats() {
      const parsed = JSON.stringify(this.cats);
      localStorage.setItem('cats', parsed);
    }
  }
};
</script>


<style>
.container {
    margin-top: 30px;
    border-radius: 5px;
    padding: 20px;

}
.container input{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border-radius: 2px;
    border: 2px solid black ;
}

.data-profile{
  margin-bottom: 20px;
}

.prof{
   margin-top: 30px;
    border-radius: 5px;
    background-color: burlywood;
    padding: 20px;
}
</style>