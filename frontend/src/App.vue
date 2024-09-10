<!-- src/App.vue -->
<template>
  <div id="app">
    <header v-if="!isAuthPage">
      <h1>Users</h1>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthPage() {
      const authRoutes = ['/login', '/register'];
      return authRoutes.includes(this.$route.path);
    }
  }
};
</script>

<style scoped>
#app {
  font-family: 'Open Sans', Avenir, Helvetica, Arial, sans-serif; /* Use the imported font */
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

header {
  background-color: #099423;
  color: white;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border-radius: 5px;
}

header h1 {
  margin-left:50%;
  margin-right: 50%;
  font-family: 'Open Sans', sans-serif;
}
</style>
