<template>
  <div>
    <h1>Simple Chat</h1>
    <div class="chat-window">
      <div v-for="message in messages" :key="message.id" class="message">
        {{ message.text }}
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message">
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import EventService from "@/services/EventService.js";
import http from '../services/http-common'

export default {
  data() {
    return {
      event_id: null,
      messages: [],    // массив сообщений
      newMessage: ''   // новое сообщение от пользователя
    };
  },
  async created() {
    await this.getEventData(); // NEW - call getEventData() when the instance is created
    console.log(this.$route.params.id);
  },
  methods: {
    async getEventData() {
      // Use the eventService to call the getEventSingle() method
      EventService.getEventSingle(this.$route.params.number).then(
        ((event) => {
          this.$set(this, "event", event);
        }).bind(this)
      );
    },
    sendMessage() {
      if (this.newMessage) {
        const messageId = Date.now().toString();
        const messageData = {
          id: messageId,
          text: this.newMessage,
          event_id: this.$route.params.number,

        };

        axios.post('http://31.41.63.47:4200/chat', messageData, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            }})
          .then(() => {
            // Успешно отправлено на сервер
            this.messages.push(messageData);
            this.newMessage = '';
          })
          .catch(error => {
            // Ошибка при отправке на сервер
            console.error(error);
          });
      }
    },
    getMessages() {
      const messageDala = {
        event_id: this.$route.params.number,
      }
      http.get('http://31.41.63.47:4200/chat',messageDala,{
        headers:{
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,

        }
      } )
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.getMessages();
  }
};
</script>
