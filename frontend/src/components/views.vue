<template>
    <div class="user-view-container">
      <div class="user-list">
        <el-table :data="users" stripe>
          <el-table-column prop="username" label="Username"></el-table-column>
          <el-table-column prop="email" label="Email"></el-table-column>
          <el-table-column label="Actions">
            <template #default="{ row }">
              <el-button @click="viewUser(row)" type="primary" size="small">View</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :visible.sync="dialogVisible" title="User Details">
        <div v-if="selectedUser">
          <p><strong>Username:</strong> {{ selectedUser.username }}</p>
          <p><strong>Email:</strong> {{ selectedUser.email }}</p>
          <p><strong>Joined:</strong> {{ selectedUser.joinedDate }}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">Close</el-button>
        </span>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { ElTable, ElTableColumn, ElButton, ElDialog } from 'element-plus';
  import axios from 'axios';
  
  export default {
    components: { ElTable, ElTableColumn, ElButton, ElDialog },
    setup() {
      const users = ref([]);
      const dialogVisible = ref(false);
      const selectedUser = ref(null);
  
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/list_users',{
            withCredentials: true
          });
          console.log(response.data);
          users.value = response.data;
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      };
  
      const viewUser = (user) => {
        selectedUser.value = user;
        dialogVisible.value = true;
      };
  
      onMounted(fetchUsers);
  
      return {
        users,
        dialogVisible,
        selectedUser,
        viewUser
      };
    }
  };
  </script>
  
  <style scoped>
  .user-view-container {
    padding: 20px;
  }
  
  .user-list {
    margin-bottom: 20px;
  }
  
  .dialog-footer {
    text-align: right;
  }
  </style>
  