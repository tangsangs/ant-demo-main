<template>
  <div>
    <div v-if="!loggedIn">
      <h1>Login</h1>
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="password" type="password" placeholder="Password">
      <button @click="login">Login</button>
    </div>
    <div v-else>
      <h1>Interface List</h1>
      <ul>
        <li v-for="interface01 in interfaces" :key="interface01.id">
          <span>{{ interface01.name }}</span>
          <button @click="showDetails(interface01)">Details</button>
        </li>
      </ul>
      <div v-if="selectedInterface">
        <h2>Interface Details</h2>
        <p>Name: {{ selectedInterface.name }}</p>
        <p>Description: {{ selectedInterface.description }}</p>
        <p>URL: {{ selectedInterface.url }}</p>
        <!-- Additional details... -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Mock from 'mockjs';

Mock.mock('/api/login', 'post', (options) => {
  const { username, password } = JSON.parse(options.body);
  if (username === 'developer' && password === 'developer') {
    return { role: 'developer' };
  } else if (username === 'tester' && password === 'tester') {
    return { role: 'tester' };
  } else if (username === 'operator' && password === 'operator') {
    return { role: 'operator' };
  } else {
    return { role: 'guest' };
  }
});

Mock.mock('/api/interfaces', 'get', {
  'interfaces|5-10': [
    {
      'id|+1': 1,
      'name': '@title',
      'description': '@sentence',
      'url': '@url',
    },
  ],
});

export default {
  data() {
    return {
      loggedIn: false,
      username: '',
      password: '',
      interfaces: [],
      selectedInterface: null,
    };
  },
  methods: {
    async login() {
      const { data } = await axios.post('/api/login', {
        username: this.username,
        password: this.password,
      });
      if (data.role !== 'guest') {
        this.loggedIn = true;
        await this.fetchInterfaces();
      }
    },
    async fetchInterfaces() {
      const { data } = await axios.get('/api/interfaces');
      this.interfaces = data.interfaces;
    },
    showDetails(interface01) {
      this.selectedInterface = interface01;
    },
  },
};
</script>

<style>
/* Your CSS styles go here */
</style>
