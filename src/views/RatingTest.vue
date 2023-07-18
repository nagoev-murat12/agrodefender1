<template>
  <div>
    <form @submit.prevent="uploadFile">
      <input type="file" ref="fileInput">

      <input type="text" ref="name">
      <input type="text" ref="expertculture">
      <input type="text" ref="education">
      <input type="text" ref="experience">
      <input type="text" ref="degree">


      <button type="submit">Upload file</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods: {
    uploadFile() {
      const filen = this.$refs.fileInput.files[0]
      
      const name = this.$refs.name.value
      const expertculture = this.$refs.expertculture.value

      const degree = this.$refs.degree.value
      const education = this.$refs.education.value
      const experience = this.$refs.experience.value


      const formData = new FormData()
      formData.append('file', filen)
      

      axios.post('http://31.41.63.47:4200/hire_image', formData,{
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
      
      formData.delete('file', filen)
            
      formData.append('name',name )

      formData.append('degree', degree)
      formData.append('education', education)
      formData.append('experience', experience)
      formData.append('expertculture', expertculture)

        axios.post('http://31.41.63.47:4200/hire_expert', formData, {
          headers:{
        Authorization: `Bearer ${localStorage.getItem('jwt')}`

          }
        })
      .then(response => {
        console.log(response.data)
        // Обработка ответа от второго сервера после загрузки файла
      })
      .catch(error => {
        console.log(error)
        // Обработка ошибки загрузки файла на второй сервер
      })
    }
  }
}
  
</script>