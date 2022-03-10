<script setup>
import { ref, reactive, onMounted } from 'vue';
const form = reactive({
  network: '',
  org: '',
  channel: '',
  user: '',
  password: '',
});
</script>

<template>
  <div class="login-wrapper">
    <div class="x-form">
      <div class="item"><input v-model="form.network" type="text" id="network" name="network" required /></div>
      <div class="item"><input v-model="form.org" type="text" id="org" name="org" required /></div>
      <div class="item"><input v-model="form.channel" type="text" id="channel" name="channel" required /></div>
      <div class="item"><input v-model="form.user" type="text" id="user" name="user" required /></div>
      <div class="item"><input v-model="form.password" type="password" id="password" name="password" required /></div>
      <div class="login">LOGIN</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: no-repeat url('@images/bg@2x.png');
  background-size: cover;
}

.x-form {
  width: 400px;
  height: 300px;

  backdrop-filter: @backdrop-filter;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: @border-radius;
  box-shadow: 2px 2px 10px rgba(255, 255, 255, 0.1);

  .item {
    width: 200px;
    height: 40px;
  }
  input {
    width: inherit;
    height: inherit;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid @orange;
  }
  .login {
    width: 200px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 40px;
    margin: 20px 0;
    background-color: @orange;
  }
}

.t-input {
  background-color: transparent;
}
</style>
