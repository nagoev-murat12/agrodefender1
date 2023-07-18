<template>
  <div class="col-md-12">
    <div class="card card-container">
      <form name="form" @submit.prevent="submitForm">
        <div class="form-group">
          <!-- <span>{{event.id}}</span> -->

          <label for=""> Время обработки хим.препаратами </label>
          <input
            type="text"
            class="form-control"
            v-model="processing_time"
            ref="processing_time"
          />
        </div>
        <div class="form-group">
          <label for=""> Сроки обработки хим.препаратами </label>
          <input
            type="text"
            class="form-control"
            v-model="processing_term"
            ref="processing_term"
          />
        </div>
        <div class="form-group">
          <label for=""> Рекомендуемая дозировка </label>
          <input
            type="text"
            class="form-control"
            v-model="recommended_dose"
            ref="recommended_dose"
          />
        </div>
        <div class="form-group">
          <label for=""> Диагноз </label>
          <input
            type="text"
            class="form-control"
            v-model="diagnosis"
            ref="diagnosis"
          />
        </div>
        <div class="form-group">
          <label for=""> Меры борьбы с возможными препаратами </label>
          <input
            type="text"
            class="form-control"
            v-model="treat_method"
            ref="treat_method"
          />
        </div>
         <div class="form-group">
          <label for=""> Возможные причины болезни с/х культуры</label>
          <input
            type="text"
            class="form-control"
            v-model="culture_diseases"
            ref="culture_diseases"
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary btn-block"
          @click="submitForm(this.$route.params.number)"
        >
          Отправить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventService from "@/services/EventService.js";

export default {
  data() {
    return {
      event: [],

      processing_time: "",
      processing_term: "",
      recommended_dose: "",
      diagnosis: "",
      treat_method: "",
      event_id: this.$route.params.number,
      culture_diseases: ""
    };
  },
  async created() {
    await this.getEventData(); // NEW - call getEventData() when the instance is created
    console.log(this.$route.params.id);
  },
  methods: {
    async getEventData() {
      // Use the eventService to call the getEventSingle() method
      EventService.getEventSingle(this.$route.params.number).then(
        ((event) => {
          this.$set(this, "event", event);
        }).bind(this)
      );
    },
    async submitForm() {
      const data = {
        processing_time: this.processing_time,
        recommended_dose: this.recommended_dose,
        processing_term: this.processing_term,
        diagnosis: this.diagnosis,
        treat_method: this.treat_method,
        event_id: this.$route.params.number,
        culture_diseases: this.culture_diseases
      };

      try {
        const response = await axios.post(
          "http://31.41.63.47:4200/reply_contact",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        console.log(response.data);
          this.$router.push("/");

      } catch (error) {
        console.log(error);
      }
    },
  },
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