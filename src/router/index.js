import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../services/http-common'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/register',///вернуть имя если что то не будет работать
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/BoardAdmin.vue'),
    
  },
  {
    path: '/mod',
    name: 'moderator',
    component: () => import('../views/BoardModerator.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/BoardUser.vue'),
    
  },
  {
    path: '/expert',
    name: 'expert',
    component: () => import('../views/ExpertView.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/expertboard',
    name: 'expertboard',
    component: () => import('../views/ExpertBoard.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/cucuruza',
    name: 'cucuruza',
    component: () => import('../views/CucuruzaForm.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/obra',
    name: 'obraview',
    component: () => import('../views/ObraView.vue'),
    meta: {
      guest: true
    }
  },
  {
    path: '/event/:number',
    props: 'true',
    name: 'eventSingle',
    component: () => import('../views/EventSingle.vue'),
    // props: (route) => ({ number: route.params.number.split(',') })
  },
  {
    path: '/chat',
    name: 'ChatView',
    component: () => import('../views/ChatView.vue'),
  },
  {
    path:'/defender',
    name: 'DefenderBoard',
    component: () => import('../views/DefenderBoard.vue')
  },
  {
    path:'/rating',
    name: 'RatingTest',
    component: () => import('../views/RatingTest.vue')
  }
  ,
  {
    path:'/test',
    name: 'Test',
    component: () => import('../views/TestView.vue')
  }
  ,
  {
    path:'/geokod',
    name: 'EventeReverseGeokod',
    component: () => import('../views/EventeReverseGeokod.vue')
  }
  ,
  {
    path:'/anketa',
    name: 'anketa',
    component: () => import('../views/AnketaExperta.vue')
  }
  
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const tokenExpiration = localStorage.getItem('tokenExpiration');

  // Проверка срока действия токена
  if (token && refreshToken && tokenExpiration) {
    const now = Date.now() / 1000;
    if (tokenExpiration - now <= 60) { // Если токен истекает через 60 секунд или менее
      http.post('/refresh', { refreshToken }, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
          
        }
      })
        .then(response => {
          const newToken = response.data.token;
          const newTokenExpiration = response.data.tokenExpiration;

          // Обновление хранилища с новым токеном и сроком его действия
          localStorage.setItem('token', newToken);
          localStorage.setItem('tokenExpiration', newTokenExpiration);

          next();
        })
        .catch(error => {
          console.error('Ошибка при обновлении токена', error);
          // Если обновление токена не удалось, перенаправляем пользователя на страницу входа
          next('/login');
        });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router
