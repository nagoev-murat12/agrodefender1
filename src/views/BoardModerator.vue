<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3 class="mb-4">Список экспертов</h3>
       
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'all' }" @click="changeTab('all')">Анкеты</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'accepted' }" @click="changeTab('accepted')">Принятые</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{ active: activeTab === 'rejected' }" @click="changeTab('rejected')">Отклоненные</a>
          </li>
        </ul>

        <ul class="list-group">
          <li v-for="(item, index) in filteredData" :key="index" class="list-group-item" >
            <div class="row">
           <p class="mb-0"><strong>Фамилия:</strong> {{ item.last_name }}</p>
                <p class="mb-0"><strong>Имя:</strong> {{ item.first_name }}</p>
                <p class="mb-0"><strong>Отчество:</strong> {{ item.partonymic }}</p>
                <p class="mb-0"><strong>Образование:</strong> {{ item.education }}</p>
                <p class="mb-0"><strong>Опыт работы:</strong> {{ item.experience }}</p>
                <p class="mb-0"><strong>Экспертиза:</strong> {{ item.expertculture }}</p>
            </div>
            <div class="col-md-4">
                <button class="btn btn-success mr-2" @click="acceptExpert(item)">Согласие</button>
                <button class="btn btn-danger" @click="rejectExpert(item)">Отказ</button>
              </div>
          </li>
        </ul>
      </div>
    </div>
    <div>
      <!-- <ChatView>
      </ChatView> -->
    </div>
  </div>
</template>


<script>
import http from '../services/http-common';
// import ChatView from '../components/ChatView.vue';
export default {
  components:{
// ChatView

  },
  data() {
    return {
      dataList: [],
      acceptedList: [],
      rejectedList: [],
      activeTab: 'all', // Default active tab is 'all'
    };
  },
  computed: {
    filteredData() {
      if (this.activeTab === 'accepted') {
        return this.acceptedList;
      } else if (this.activeTab === 'rejected') {
        return this.rejectedList;
      } else {
        return this.dataList;
      }
    },
  },
  methods: {
    saveData() {
      localStorage.setItem('dataList', JSON.stringify(this.dataList));
      localStorage.setItem('acceptedList', JSON.stringify(this.acceptedList));
      localStorage.setItem('rejectedList', JSON.stringify(this.rejectedList));
    },
    restoreData() {
      
      const savedDataList = localStorage.getItem('dataList');
      const savedAcceptedList = localStorage.getItem('acceptedList');
      const savedRejectedList = localStorage.getItem('rejectedList');

      if (savedDataList) {
        this.dataList = JSON.parse(savedDataList);
      }
      if (savedAcceptedList) {
        this.acceptedList = JSON.parse(savedAcceptedList);
      }
      if (savedRejectedList) {
        this.rejectedList = JSON.parse(savedRejectedList);
      }
    },
    acceptExpert(item, tab) {
    item.accepted = true;
    item.accepted = 'accepted'
    this.acceptedList.push(item);

    const index = this.dataList.indexOf(item);
    if (index !== -1) {
      this.dataList.splice(index, 1);
    }

    this.saveData(); // Save data to Local Storage

    http.post(`/expert_allow`, { allow: true, id: item.id, accepted: 'accepted' })
      .then(response => console.log(response.data));
       if (tab === 'all') {
    this.activeTab = 'accepted';
  }
  },
  rejectExpert(item,tab) {
    item.accepted = false;
    item.accepted = 'rejected'

    this.rejectedList.push(item);

    const index = this.dataList.indexOf(item);
    if (index !== -1) {
      this.dataList.splice(index, 1);
    }

    this.saveData(); // Save data to Local Storage

    http.post(`/expert_allow`, { allow: false, id: item.id, accepted: 'accepted'})
      .then(response => console.log(response.data));
      if (tab === 'all') {
    this.activeTab = 'rejected';
  }
  },
    
    changeTab(tab) {
      this.activeTab = tab;
      
      
    },
  },
  mounted() {
    this.restoreData(); // Restore data from Local Storage

    // First, load data from the server
    http.get('/expert_list_allow' )
      .then(response => {
         console.log(response.data)

        // After loading data from the server, check if there are any saved data in Local Storage
        // If yes, assign them to the acceptedList and rejectedList arrays
        if (this.acceptedList.length === 0 && this.rejectedList.length === 0) {
          this.acceptedList = JSON.parse(localStorage.getItem('acceptedList')) || [];
          this.rejectedList = JSON.parse(localStorage.getItem('rejectedList')) || [];
        }
      })
      .catch(error => console.log(error));

    http.get('/get_image')
      .then(response => {
        this.files = response.data;
      })
      .catch(error => console.log(error));
  },
};
</script>
