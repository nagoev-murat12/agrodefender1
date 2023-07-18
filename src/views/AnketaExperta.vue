<template>
    <div class="container">
	<div class="screen">
		<div class="col-md-12">
			<form  @submit.prevent="submitForm">
				<h1 style="text-align: center">Анкета агрозащитника</h1>
				<br>
				<div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="form-control" v-model="first_name" placeholder="Имя">
				</div>
				<div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="form-control" v-model="last_name" placeholder="Фамилия">
				</div>
                <div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="form-control" v-model="patronymic" placeholder="Отчество">
				</div>
                <div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="form-control" v-model="education" placeholder="Образование">
				</div>
                <div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="form-control" v-model="degree" placeholder="Степень">
				</div>
                <div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<input type="text" class="form-control" v-model="experience" placeholder="Стаж работы">
				</div>
                <div class="form-group">
					<i class="login__icon fas fa-user"></i>
					<ExperienceView></ExperienceView>
                    <EducationView></EducationView>
                    <DegreeView></DegreeView>
				</div>
				<button class="btn btn-primary btn-block">
					<span class="button__text">Отправить</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
</template>


<script>
import axios from 'axios';
import ExperienceView from '../components/ExperienceView.vue'
import EducationView from '../components/EducationView.vue'
import DegreeView from '../components/DegreeView.vue'
export default {
 components:{
    ExperienceView, EducationView, DegreeView
  },

  data() {
    return {
      name: '',
      expertculture: '',
      degree: '',
      education: '',
      experience: ''
    }
  },
  methods: {
    submitForm() {
      const data = {
        name: this.name,
        expertculture: this.expertculture,
        degree: this.education,
        education: this.education,
        experience: this.experience
      };
      axios.post('http://31.41.63.47:4200/hire_expert', data, {
        headers:{
        Authorization: `Bearer ${localStorage.getItem('jwt')}`

        }
      })
        .then(response => {
          console.log(response.data);
           this.$router.push('/defender')
        })
        
        .catch(error => {
          console.log(error);
        });
    }
  }
}
</script>


