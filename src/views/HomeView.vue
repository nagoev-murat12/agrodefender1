<template>
  <div class="home">
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container">
          <h1 class="title" v-if="isUser">Добро пожаловать фермер</h1>
          <h1 class="title" v-else-if="isExpert">
            Добро пожаловать Агрозащитник
          </h1>

          <h2 class="subtitle" v-if="isUser">
            Составьте обращение со своей проблемой и мы поможем решить ее
          </h2>
          <div class="button-block" v-if="isUser">
            <!-- <button class="button is-xl is-dark">
              Добавить новое обращение
            </button> -->
            <router-link to="/cucuruza" class="button is-xl is-dark">
              Добавить новое обращение
            </router-link>
          </div>
        </div>
      </div>
    </section>
    <EventList></EventList>
  </div>
</template>

<script>
import EventList from "../components/EventList.vue";
export default {
  name: "HomeView",
  components: {
    EventList,
  },
  data() {
    return {
      userType: "",
    };
  },
  mounted() {
    if (localStorage.getItem("userType")) {
      this.userType = localStorage.getItem("userType");
    }
  },
  computed: {
    isExpert() {
      return this.userType === "expert";
    },
    isUser() {
      return this.userType === "user";
    },
    IsAdmin(){
      return this.userType === "admin";
    }
  },
};
</script>

<style lang="scss" scoped>
.hero {
  text-align: center;
  background-image: url("https://agroportal-ziz.ru/sites/default/files/images/articles/kukuruza_polya.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 400px;
}
.hero-body .title {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.6);
  padding: 40px 0 20px 0;
  font-size: 60px;
}
.subtitle {
  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.7);
  font-size: 30px;
}
.button-block {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  position: absolute;
  bottom: -150px;
  .button {
    margin-right: 50px;
    padding-left: 50px;
    padding-right: 50px;
  }
  .welcome {
    width: 400px;
    padding: 10px;
    margin-left: auto;
    margin-right: auto;
  }
}
.is-xl {
  font-size: 1.7rem;
}
</style>
