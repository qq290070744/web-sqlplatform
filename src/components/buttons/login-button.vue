<template>
  <button class="button__login" @click="handleLogin">Log In</button>
</template>

<script>
export default {
  methods: {
    handleLogin() {
      this.$auth0.loginWithRedirect({
        appState: {
          targetPath: "/index",
        },
        authorizationParams: {
          prompt: "login",
        },
      });
    },
  },
};
</script>
