<template>
  <div>
    <h2>Rating: {{ rating }}</h2>
    <RatingView :rating.sync="rating"></RatingView>
  </div>
</template>


<script>
import RatingView from '../components/RatingView.vue'

export default {
    components: {
    RatingView,
  },
  data() {
    return {
      rating: 3,
    };
  },
}
</script>