<template>
  <div>
    <div>
      <span> Время обработки хим.препаратами: {{data.processing_time}} </span>
    </div>
    <div>
      <span> Сроки обработки хим.препаратами: {{data.processing_term}} </span>
    </div>
    <div>
      <span> Рекомендуемая дозировка: {{data.recommended_dose}} </span>
    </div>
    <div>
      <span> Диагноз: {{data.diagnosis}} </span>
    </div>
    <div>
      <span> Меры борьбы с возмоными препаратами: {{data.treat_method}} </span>
    </div>
  </div>
</template>


<script>
import http from '../services/http-common'

export default {
    data() {
        return {
       data: null
        }
    },
    created() {
         http.get( "http://31.41.63.47:4200/messages")
        .then(response =>(this.data = response.data))
        .catch(error =>{
            console.log(error)
        })
    }
        
    
}
</script>