<template>
  <div class="chat-container">
    <div class="contact-list">
      <select v-model="selectedContact">
        <option disabled value="">Select a contact</option>
        <option v-for="(contact, index) in contacts" :key="index" :value="contact.id">
          {{ contact.name }}
        </option>
      </select>
    </div>

    <ul class="chat-messages">
      <li v-for="(message, index) in messages" :key="index" class="chat-message">
        {{ message }}
      </li>
    </ul>

    <div class="chat-input">
      <input type="text" v-model="newMessage" placeholder="Type your message" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contacts: [],
      selectedContact: '',
      messages: [],
      newMessage: '',
    };
  },
  methods: {
    fetchContacts() {
      axios.get('/api/contacts')
        .then(response => {
          this.contacts = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch contacts:', error);
        });
    },
    fetchMessages() {
      axios.get('/api/messages')
        .then(response => {
          this.messages = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch messages:', error);
        });
    },
    sendMessage() {
      if (this.newMessage && this.selectedContact) {
        const message = {
          text: this.newMessage,
          recipient: this.selectedContact,
        };

        axios.post('/api/messages', message)
          .then(() => {
            // Handle successful message sent
            this.newMessage = ''; // Clear the input field
          })
          .catch(error => {
            console.error('Failed to send message:', error);
          });
      }
    },
  },
  created() {
    this.fetchContacts();
    this.fetchMessages();
  },
};
</script>

<style scoped>
/* Add your chat styling here */
</style>