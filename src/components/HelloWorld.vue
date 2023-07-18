<template>
  <div class="chat-container">
    <ul class="chat-messages">
      <li v-for="message in messages" :key="message.id" class="chat-message">
        {{ message.message }}
      </li>
    </ul>

    <div class="chat-input">
      <input type="text" v-model="newMessage" placeholder="Type your message" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EventService from "@/services/EventService.js";

export default {
  data() {
    return {
      event: [],
      title: '',
      event_id: this.$route.params.number,
      messages: [], // Массив для хранения сообщений
      newMessage: '', // Свойство для хранения нового сообщения
    };
  },
  created() {
    this.getEventData();
    this.fetchMessages(); // Загрузка сообщений при создании компонента
  },
  methods: {
    getEventData() {
      EventService.getEventSingle(this.$route.params.number)
        .then((event) => {
          this.event = event;
        })
        .catch((error) => {
          console.error("Failed to fetch event data:", error);
        });
    },
    async sendMessage() {
      const data = {
        title: this.newMessage, // Используем свойство newMessage
        event_id: this.$route.params.number,
      };

      try {
        const response = await axios.post(
          "http://31.41.63.47:4200/chat",
          data,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        console.log(response.data);

        // После успешной отправки сообщения, обновляем список сообщений
        this.fetchMessages();
      } catch (error) {
        console.log(error);
      }

      // Очищаем поле ввода после отправки сообщения
      this.newMessage = '';
    },
    fetchMessages() {
      axios
        .get("http://31.41.63.47:4200/messages", {
          params: {
            event_id: this.$route.params.number,
            
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        })
        .then((response) => {
          this.messages = response.data.data;
        })
        .catch((error) => {
          console.error("Failed to fetch messages:", error);
        });
    },
  },
};
</script>
