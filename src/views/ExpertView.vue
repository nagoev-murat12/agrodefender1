<template>
  <div>
<JsonView ></JsonView>
  </div>
</template>

<script>
import axios from 'axios'

import JsonView from '@/components/JsonView.vue'
export default {
   components: {
    JsonView
  },
   data() {
    return {
      data1: {},
      data2: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      axios.get("http://31.41.63.47:4200/messages",{ headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt')}`

      }
      })
        .then(response => {
          this.data1 = response.data
        })
        .catch(error => {
          console.log(error)
        })
      
      axios.get("https://example.com/api/data2")
        .then(response => {
          this.data2 = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>