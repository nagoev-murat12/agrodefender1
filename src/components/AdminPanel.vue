<template>
 <div>
    <ul class="message-list">
      <li v-for="message in messages" :key="message.id" class="message-item">
        <div class="message-diagnosis"></div>
        <div class="message-id">ID обращения:{{ message.event_id }}</div>

        <div class="message-details">
          <div class="message-diagnosis">Диагноз:{{ message.diagnosis }}</div>
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
import http from "../services/http-common"
export default {
  data() {
    return {
      forms: [],
      formData: {},
    }
  },
  methods: {
    submitForm(index, isAccepted) {
      const data = { ...this.formData, isAccepted }
      http.post('/submit-form', data).then((response) => {
        console.log(response.data)
      })
    },
  },
}
</script>