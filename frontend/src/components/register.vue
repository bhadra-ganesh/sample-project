<template>
  <div class="register-container">
    <div class="form-box">
      <el-form :model="registerForm" @submit.prevent="register" class="register-form">
        <el-form-item label="Username" :label-width="formLabelWidth">
          <el-input v-model="registerForm.username" placeholder="Username"></el-input>
        </el-form-item>
        <el-form-item label="Email" :label-width="formLabelWidth">
          <el-input v-model="registerForm.email" type="email" placeholder="Email"></el-input>
        </el-form-item>
        <el-form-item label="Password" :label-width="formLabelWidth">
          <el-input v-model="registerForm.password" type="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item class="button-container">
          <el-button type="primary" @click="register">Register</el-button>
        </el-form-item>
      </el-form>
      <div class="link-container">
        <p>Already have an account? <router-link to="/login">Login</router-link></p>
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
    const registerForm = ref({
      username: '',
      email: '',
      password: ''
    });

    const formLabelWidth = '100px';
    const router = useRouter(); 

    const register = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/register', 
          registerForm.value, 
          {
            withCredentials: true
          }
        );
        ElMessage.success('Registration successful! Please log in.');
        router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        ElMessage.error('Registration failed. Please try again.');
      }
    };

    return {
      registerForm,
      formLabelWidth,
      register
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

.register-container {
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

.register-form {
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
