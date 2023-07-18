<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="uploadFile">
        <div v-if="!successful">
          <div class="form-group">
          
            <label for="name">ФИО</label>
            <input
              v-model="user.name"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="name"
              ref="name"
            />
            <label for="experience">Стаж работы</label>  <!--Прикрепить копию трудовой книги-->
            

            <input
              v-model="user.experience"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="experience"
              ref="experience"
            />
            <input type="file" ref="fileInput">

            <label for="education">Образование</label> <!--Прикрепить скан диплома-->
            

            <input
              v-model="user.education"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="education"
              ref="education"
            />
            <input type="file" ref="fileInput1">

            <label for="degree">Степень</label> <!--Прикрепить скан диплома-->
            
            <input
              v-model="user.degree"
              v-validate="'required|min:3|max:20'"
              type="text"
              class="form-control"
              name="degree"
              ref="degree"
            />
            <input type="file" ref="fileInput2">

            <label for="expertculture">Вид культуры</label> <!--Выпадающий список-->
            <input
              v-model="user.expertculture"
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

      <div
        v-if="message"
        class="alert"
        :class="successful ? 'alert-success' : 'alert-danger'"
      >{{message}}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  methods: {
    uploadFile() {
      const filen = this.$refs.fileInput.files[0]
      const filen1 = this.$refs.fileInput1.files[0]
      const filen2 = this.$refs.fileInput2.files[0]
      const name = this.$refs.name.value
      const formData = new FormData()
      formData.append('file', filen)
      formData.append('file', filen1)
      formData.append('file', filen2)

      axios.post('http://31.41.63.47:4200/upload', formData)
      .then(response => {
        console.log(response.data)
        // Обработка ответа от первого сервера после загрузки файла
      })
      .catch(error => {
        console.log(error)
        // Обработка ошибки загрузки файла на первый сервер
      })

      formData.append( name)
      

      axios.post('http://31.41.63.47:4200/upload', formData)
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

};
</script>