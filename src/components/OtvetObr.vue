
<template>
  <div>
    <ul>
      <li v-for="message in messages" :key="message.id">
        Диагноз:{{ message.diagnosis }}
        Время обработки хим.препаратами: {{message.processing_time}}
        Сроки обработки хим.препаратами: {{message.processing_term}}
        Рекомендуемая дозировка: {{message.recommended_dose}}
        Меры борьбы с возмоными препаратами: {{message.treat_method}}
      </li>
    </ul>
  </div>
</template>

<script>
import http from '../services/http-common';

export default {
  data() {
    return {
      messages: [], // массив объектов приходящих данных
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await http.get('http://31.41.63.47:4200/messages');
        this.messages = response.data; // сохраняем полученные данные в переменную items
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>