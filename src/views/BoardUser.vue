<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="uploadFile">
       

          <div class="form-group">
           
            <label for="name">ФИО</label>
            <input
              v-model="user.name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="name"
            />
            <label for="experience">Стаж работы</label>  <!--Прикрепить копию трудовой книги-->
            <UploadImage></UploadImage>

            <input
              v-model="user.experience"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="experience"
            />
            <label for="education">Образование</label> <!--Прикрепить скан диплома-->
            <UploadImage></UploadImage>

            <input
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="education"
            />
            <label for="degree">Степень</label> <!--Прикрепить скан диплома-->
            <UploadImage></UploadImage>
            <input
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="degree"
            />
            <label for="expertculture">Вид культуры</label> <!--Выпадающий список-->
            <input
              v-validate="'required|min:3|max:20'"
              type="text"
              list="expertculture"
              class="form-control"
              name="expertculture"
            />
            <datalist id="expertculture" class="dropdown-menu">
          <option value="Куруза"></option>
          <option value="Яблоки"></option>
          <option value="Пшеница"></option>
          <option value="Рожь"></option>
          <option value="Ячмень "></option>
          <option value="Овес"></option>
          <option value="Сорго"></option>
          <option value="Просо"></option>
          <option value="Горох"></option>
          <option value="Фасоль"></option>
          <option value="Подсолнечник"></option>
          <option value="Соя "></option>
          <option value="Рапс"></option>
          <option value="Горчица"></option>
          <option value="Картофель"></option>
          <option value="Томаты"></option>
          <option value="Огурцы"></option>
          <option value="Виноград"></option>
          <option value="Огурцы"></option>
          <option value="Грушы"></option>
        </datalist>
           
          
           
         
          
          
          
          <div class="form-group">
            <button class="btn btn-primary btn-block">Зарегистрироваться</button>
          </div>
        </div>
      </form>

  </div>
   
  </div>
</template>

<script>
import http from '../services/http-common'

export default {
  methods: {
    uploadFile() {
      // const filen = this.$refs.fileInput.files[0]
      // const filen1 = this.$refs.fileInput1.files[0]
      // const filen2 = this.$refs.fileInput2.files[0]
      const name = this.$refs.name.value
      const expertculture = this.$refs.expertculture.value
      const degree = this.$refs.degree.value
      const experience = this.$refs.experience.value



      const formData = new FormData()
      // formData.append('file', filen)
      // formData.append('file', filen1)
      // formData.append('file', filen2)
    




      // http.post('http://31.41.63.47:4200/hire_image', formData,)
      // .then(response => {
      //   console.log(response.data)
      //   // Обработка ответа от сервера после загрузки файла
      // })
      // .catch(error => {
      //   console.log(error)
      //   // Обработка ошибки загрузки файла
      // })
      formData.append('name', name)
      formData.append('expertculture', expertculture)
      formData.append('degree', degree)
      formData.append('expirience', experience)


        http.post('http://31.41.63.47:4200/hire_expert', formData)
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