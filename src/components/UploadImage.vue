<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input type="file" class="form-control" ref="fileInput">
      <!-- <input type="file" ref="fileInput1"> -->

      <button type="submit">Прикрепить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    uploadFile() {
      const filen = this.$refs.fileInput.files[0]
      // const filen1 = this.$refs.fileInput1.files[0]

      const formData = new FormData()
      formData.append('file', filen)
      // formData.append('file', filen1)


      axios.post('http://31.41.63.47:4200/contactimg', formData,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
          
        }
      })
      .then(response => {
        console.log(response.data)
        // Обработка ответа от сервера после загрузки файла
      })
      .catch(error => {
        console.log(error)
        // Обработка ошибки загрузки файла
      })
    }
  }
}
</script>