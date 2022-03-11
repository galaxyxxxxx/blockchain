<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@api/login';

const form = reactive({
  network: 'fe0f6e13-25af-49ba-b85f-cd7febed68f7',
  org: '17bd71f0-125f-436c-8dd6-f7354ef8ad1b',
  channel: 'testchan1',
  username: 'screent',
  password: 'Qq123!12',
});

const formInit = {
  network: '',
  org: '',
  channel: '',
  username: '',
  password: '',
};

const router = useRouter();

const submit = async () => {
  // TODO: check data
  if (form.network === '' || form.org === '' || form.channel === '' || form.username === '' || form.password === '') {
    alert('Please enter all information');
    return;
  }

  // submit
  const { username, password, network, org, channel } = form;
  const resp = await login({ username, password, network, org, channel });

  if (resp) {
    router.push({ name: 'dashboard' });
  } else {
    alert('登录失败，刷新试试？');
  }
};
</script>

<template>
  <div class="login-wrapper">
    <div class="x-form">
      <div class="item"><input v-model="form.network" type="text" id="network" name="network" required /></div>
      <div class="item"><input v-model="form.org" type="text" id="org" name="org" required /></div>
      <div class="item"><input v-model="form.channel" type="text" id="channel" name="channel" required /></div>
      <div class="item"><input v-model="form.username" type="text" id="username" name="username" required /></div>
      <div class="item"><input v-model="form.password" type="password" id="password" name="password" required /></div>
      <div class="login" @click="submit" @touchend="submit">LOGIN</div>
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
    background-color: transparent !important;
    border: none;
    border-bottom: 1px solid @orange;
    outline: none;

    &:focus {
      outline: none;
    }
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
    opacity: 0.8;
    transition: all 0.3s linear;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
}

.t-input {
  background-color: transparent;
}
</style>
