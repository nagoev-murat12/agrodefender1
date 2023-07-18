<template>
  <div class="event-single">
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">{{ event.name }}</h1>
          <h2 class="subtitle ">
            <strong>Date:</strong> {{ event.date }}
            <br />
            <strong>Время поступления запроса:</strong> {{ event.time }}
          </h2>
        </div>
      </div>
    </section>
    <section class="event-content">
      <div class="container">
        <br>
        <p class="is-size-5"><strong>Область(край, республика): {{ event.location }}</strong></p>
        <p class="is-size-5"><strong>Введите название фирмы или физ.лица:{{ event.name }}</strong></p>
        <p class="is-size-5"><strong>Культура:{{ event.culture }}</strong></p>
        <p class="is-size-5"><strong>Сорт или гибрид: {{ event.grade }}</strong></p>
        <p class="is-size-5"><strong>Предшествующая культура:{{ event.prev_crop }}</strong> </p>
        <p class="is-size-5"><strong>Количество гектар:</strong> {{ event.gektar}}</p>
        <p class="is-size-5"><strong>Проведенные защитные мероприятия</strong> {{ event.prev_grade }}</p>
        <p class="is-size-5"><strong>Дата обнаружения поражения :</strong> {{ event.data }}</p>
        <p class="is-size-5"><strong>Режим полива:</strong> {{ event.watering_type }}</p>
        <p class="is-size-5"><strong>Вредоносность:{{ event.crop}}</strong></p>
        <br>
        <p class="is-size-5"><strong>Симптомы поражения:</strong> {{ event.infection_scale }}</p>
        <!-- <p class="is-size-5"><strong>Предыдущий сорт/гибрид:</strong> {{ event.prev_grade }}</p> -->
        <!-- <p class="is-size-5"><strong>Обраыботка почв:</strong> {{ event.ground_process  }}</p>
        <p class="is-size-5"><strong>Тип полива:</strong> {{ event.infection_scale }}</p>
        <p class="is-size-5"><strong>Тип полива:</strong> {{ event.crop}}</p>
        <p class="is-size-5"><strong>Тип полива:</strong> {{ event.description}}</p>
        <p class="is-size-5"><strong>Тип полива:</strong> {{ event.expert}}</p> -->
        <p class="is-size-5"><strong>Изображение вредителей/болезни:</strong> </p>
        <div v-if="isExpert">
        <TestTest>

        </TestTest>
        </div>
        <div v-if="isUser">
          <FermOtvet>

          </FermOtvet>
        </div>
        <div>
          <!-- <HelloWorld></HelloWorld> -->
        </div>
        <div class="event-images columns is-multiline has-text-centered">
          <!-- image: string[] -->
          <div
            v-for="image in event.image"
            :key="image.id"
            class="column is-one-third"
          >
          <img :src="getImageSrc(image)" :alt="image.name" />
          </div>
        </div>
        <div>
          
        </div>
      </div>
      
    </section>
  </div>
</template>
<script>
// NEW - import EventService
import EventService from '@/services/EventService.js';
import TestTest from '@/components/TestTest.vue'
import FermOtvet from '@/components/FermOtvet.vue';
// import HelloWorld from "@/components/HelloWorld.vue"
export default {
  components:{
    TestTest, FermOtvet,
    // HelloWorld
  },
  name: 'EventSingle',
  data() {
    // NEW - initialize the event object
    return {
      userType:"",
      event:{
        images: []
      },
    }
    
  },
  mounted() {
  if (localStorage.getItem('userType')) {
    this.userType = localStorage.getItem('userType')
  }
},
  computed:{
    isExpert() {
      return this.userType ==='expert'
    },
    isUser() {
      return this.userType ==='user'
    }
  },
 async created() {
   await this.getEventData(); // NEW - call getEventData() when the instance is created
   console.log(this.$route.params.id)

  }, 
  // NEW
 methods: {
  async getEventData() {
    try {
      const event = await EventService.getEventSingle(this.$route.params.number);
      this.event = event;
    } catch (error) {
      console.error(error);
      
    }
  },
  
  /**
   * @param image string
   */
  getImageSrc(image) {
    return `data:image/jpeg;base64,${image}`;
    
  }
  
}
}
</script>
  