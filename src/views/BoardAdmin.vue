<template>
  <div>
    <form @submit.prevent="uploadFiles">
      <input type="file" ref="fileInput" multiple>
      <!-- <input type="file" ref="fileInput1" multiple> -->

      <button type="submit">Прикрепить</button>
    </form>
  </div>
</template>

<script>
import http from '../services/http-common'

export default {
  methods: {
    uploadFiles() {
      const files = this.$refs.fileInput.files
      // const files1 = this.$refs.fileInput1.files

      const formData = new FormData()
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i])
      }
      // for (let i = 0; i < files1.length; i++) {
      //   formData.append('files', files1[i])
      // }

      http.post('http://31.41.63.47:4200/hire_image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          console.log(response.data)
          // Обработка ответа от сервера после загрузки файлов
        })
        .catch(error => {
          console.log(error)
          // Обработка ошибки загрузки файлов
        })
    }
  }
}
</script>
