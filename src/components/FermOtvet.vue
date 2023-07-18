<template>
  <div>
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" class="message-item">
        <div class="message-diagnosis"></div>
        <div class="message-id">ID обращения:{{ message.event_id }}</div>

        <div class="message-details">
          <div class="message-diagnosis">Диагноз:{{ message.diagnosis }}</div>
          <div class="message-processing-time">
            Время обработки хим.препаратами: {{ message.processing_time }}
          </div>
          <div class="message-processing-term">
            Сроки обработки хим.препаратами: {{ message.processing_term }}
          </div>
          <div class="message-recommended-dose">
            Рекомендуемая дозировка: {{ message.recommended_dose }}
          </div>
          <div class="message-treat-method">
            Меры борьбы с возмоными препаратами: {{ message.treat_method }}
          </div>
          <div class="culture_diseases">
            Возможные причины болезни с/х культуры:
            {{ message.culture_diseases }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "../services/http-common";
import EventService from "@/services/EventService.js";

export default {
  data() {
    return {
      messages: [],
      event_id: this.$route.params.number,
       // массив объектов приходящих данных
    };
  },
  mounted() {
    this.getData();
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
    async getData() {
      try {
         const response = await http.get("http://31.41.63.47:4200/messages", {
          params: {
            event_id:this.$route.params.number, // передача event_id как параметра запроса
          },
        });
        this.messages = response.data; // сохраняем полученные данные в переменную items
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.message-list {
  list-style: none;
  padding: 0;
}

.message-item {
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

.message-diagnosis {
  margin: 5px 0;
}
.message-id {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}

.message-details {
  font-size: 14px;
  line-height: 1.5;
}

.message-processing-time {
  margin: 5px 0;
}

.message-processing-term {
  margin: 5px 0;
}

.message-recommended-dose {
  margin: 5px 0;
}

.message-treat-method {
  margin: 5px 0;
}
.culture_diseases{
  margin: 5px 0;
}

</style>
