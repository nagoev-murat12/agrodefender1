<template>
 <div>
    <ul class="message-list">
      <li v-for="expert in experts" :key="expert.id" class="message-item">
        <div class="message-diagnosis"></div>
        <div class="message-id">ID обращения:{{ expert.id }}</div>

        <div class="message-details">
          <div class="message-diagnosis">Диагноз:{{ expert.first_name }}</div>
          <div class="message-processing-time">Время обработки хим.препаратами: {{ message.processing_time }}</div>
          <div class="message-processing-term">Сроки обработки хим.препаратами: {{ message.processing_term }}</div>
          <div class="message-recommended-dose">Рекомендуемая дозировка: {{ message.recommended_dose }}</div>
          <div class="message-treat-method">Меры борьбы с возмоными препаратами: {{ message.treat_method }}</div>
        </div>
      </li>
    </ul>
     <button @click="submitForm(index, true)">Согласие</button>
      <button @click="submitForm(index, false)">Отказ</button>
  </div>
     
    
  
</template>


<script>
import http from '../services/http-common';

export default {
  data() {
    return {
      expert_list: [], // массив объектов приходящих данных
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      try {
        const response = await http.get('http://31.41.63.47:4200/expert_allow');
        this.expert_list = response.data; // сохраняем полученные данные в переменную items
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>