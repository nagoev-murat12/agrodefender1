<template>
  <div class="events container">
    <h2 class="subtitle is-3">Ваши заявки:</h2>
    <div class="columns is-multiline">
      <div
        v-for="event in events"
        :event="event.id"
        :key="event.id "
        class="column is-one-quarter"
      >
        <router-link :to="'/event/' + event.id"> <!--"{name: 'eventSingle', params: { name: eventNumber }}"-->
          <EventCard :event="event " />
        </router-link>
      </div>
    </div>
  </div>
</template>


<script>
import EventCard from "@/components/EventCard.vue";
import EventService from '@/services/EventService.js'; // NEW
export default {
   
   
  name: "EventsList",
  components: {
    EventCard
  },
  data() {
    
    return {
      
      events: [],
    };
  },
  created() {
    this.getEventsData(); // NEW - call getEventData() when the instance is created
  },
  // NEW
  methods: {
    async getEventsData() {
      // NEW - Use the eventService to call the getEvents() method
      EventService.getEvents()
      .then(
        (events => {
          this.$set(this, "events", events);
        }).bind(this)
        
      );
      console.log(JSON.parse(JSON.stringify(this.events)));
    }
    
  }
};
</script>

<style lang="scss" scoped>
  .events {
    margin-top: 100px;
    text-align: center;
  }
</style>