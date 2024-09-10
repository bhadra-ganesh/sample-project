<template>
  <div class="login-container">
    <div class="form-box">
      <el-form :model="loginForm" @submit.prevent="login" class="login-form">
        <el-form-item label="E-mail" :label-width="formLabelWidth">
          <el-input v-model="loginForm.email" placeholder="email"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="loginForm.password" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
      <div class="link-container">
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton, ElMessage } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  components: { ElForm, ElFormItem, ElInput, ElButton },
  setup() {
    const loginForm = ref({
      email: '',
      password: ''
    });

    const formLabelWidth = '100px';
    const router = useRouter(); 

    const login = async () => {
      try {
        const res = await axios.post(
          'http://localhost:3000/api/login', 
          loginForm.value, 
          {
            withCredentials: true
          }
        );
        ElMessage.success(res.data.message);
        router.push('/users');
      } catch (error) {
        console.error('Login failed:', error);
        ElMessage.error('Login failed. Please check your credentials.');
      }
    };

    return {
      loginForm,
      formLabelWidth,
      login
    };
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  margin-top: 150px;
}

.form-box {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.link-container {
  margin-top: 20px;
  text-align: center;
}

.link-container p {
  margin: 0;
}

.link-container a {
  color: #409EFF;
  text-decoration: none;
}
</style>
