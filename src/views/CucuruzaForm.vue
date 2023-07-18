<template>
  <div>
    <form @submit.prevent="uploadAnket" >
      <div class="form-group">
        <input
          type="text"
          v-model="location"
          class="form-control"
          ref="location"
          placeholder="Область(Край, Республика, Населенный пункт)"
        />
        <br /><br />
        <input
          type="text"
          v-model="name"
          class="form-control"
          ref="name"
          placeholder="Введите название фирмы или физ. лица"
        />
        <br /><br />
        <input
          type="text"
          v-model="culture"
          class="form-control"
          ref="culture"
          list="culture"
          placeholder="Культура"
        />

        <datalist id="culture" class="dropdown-menu">
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
        <br /><br />
        <input
          type="text"
          v-model="grade"
          class="form-control"
          ref="grade"
          placeholder="Cорт или гибрид (укажите название)"
        />
        <br /><br />
        <input
          type="text"
          v-model="prev_crop"
          class="form-control"
          ref="prev_crop"
          placeholder="Предшествующая культура"
        />
        <br /><br />
        <input
          type="text"
          v-model="gektar"
          class="form-control"
          ref="gektar"
          placeholder="Количество гектар"
        />
        <br /><br />
        <input
          type="text"
          v-model="prev_grade"
          class="form-control"
          ref="prev_grade"
          placeholder="Проведенные защитные мероприятия"
        />
        <br /><br />
        <input
          type="text"
          v-model="data"
          class="form-control"
          ref="data"
          placeholder="Дата обнаружения поражения"
        />
        <br /><br />
        <input
          type="text"
          v-model="watering_type"
          class="form-control"
          ref="watering_type"
          placeholder="Режим полива"
          list="watering_type"
        />
        <datalist id="watering_type" class="dropdown-menu">
          <option value="Капельный"></option>
          <option value="Напуском"></option>
          <option value="Фрегатом"></option>
        </datalist>
        <br /><br />
        <input
          type="text"
          v-model="crop"
          class="form-control"
          list="crop"
          ref="crop"
          placeholder="Вредоносность"
        />
        <datalist id="crop" class="dropdown-menu">
          <option value="Слабая"></option>
          <option value="Средняя"></option>
          <option value="Сильная"></option>
        </datalist>
        <br /><br />
        <input
          type="text"
          v-model="infection_scale"
          class="form-control"
          ref="infection_scale"
          list="infection_scale"
          placeholder="Симптомы поражения"
        />
        <datalist id="infection_scale" class="dropdown-menu">
          <option value="Болезнью"></option>
          <option value="Вредителем"></option>
          <option value="Сорняком"></option>
        </datalist>
        <br /><br />
        <input
          type="text"
          ref="expert"
          class="form-control"
          v-model="expert"
          list="expert"
          placeholder="Выберите эксперта из списка либо введите данные"
        />
        <datalist id="expert">
          <option
            v-for="user in usersList"
            :value="user.id"
            :key="user.id"
          >
           ФИО:{{user.last_name}};<br> Культура:{{user.culture}}; <br> Образование:{{user.education}};   <br> Степень:{{user.degree}}; <br> Опыт: {{user.experience}} {{user.email}} {{user.email}}
          </option>
        </datalist>

        <!-- <TestTest></TestTest>  -->
     <input type="file" class="form-control" ref="fileInput" @change="handleFileUpload" multiple>
        <br /><br />
        <button class="btn btn-primary" type="submit">Отправить</button>
      </div>
    </form>
  </div>
</template>

<script>
// import BoardAdmin from '../views/BoardAdmin.vue'
import axios from "axios";
// import UploadImage from "../components/UploadImage.vue";
export default {
  // components: {
  //   UploadImage,
  // },
  data() {
    return {
      location: "",
      name: "",
      culture: "",
      grade: "",
      prev_crop: "",
      gektar: "",
      prev_grade: "",
      data: "",
      watering_type: "",
      crop: "",
      infection_scale: "",
      expert: "",
      usersList: [],
      file: null
    };
  },
  async created() {
    try {
      const response = await axios.get("http://31.41.63.47:4200/getexperts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      this.usersList = response.data;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
        handleFileUpload(event) {
        this.file = event.target.files[0];
      },
    uploadAnket() {
      const formData = new FormData()
        formData.append("location", this.location);
        formData.append("name", this.name);
        formData.append("culture", this.culture);
        formData.append("grade", this.grade);
        formData.append("prev_crop", this.prev_crop);
        formData.append("gektar", this.gektar);
        formData.append("prev_grade", this.prev_grade);
        formData.append("data", this.data);
        formData.append("watering_type", this.watering_type);
        formData.append("crop", this.crop);
        formData.append("infection_scale", this.infection_scale);
        formData.append("expert", this.expert);
        formData.append("image", this.file);
         for (let i = 0; i < this.file.length; i++) {
    formData.append("image[]", this.file[i]);
  }
      
      axios
        .post("http://31.41.63.47:4200/contact", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get("http://31.41.63.47:4200/expert_list_allow", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
