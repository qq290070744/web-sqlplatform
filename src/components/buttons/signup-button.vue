<template>
  <button class="button__sign-up" @click="handleSignUp">Sign Up</button>
</template>

<script>
export default {
  methods: {
    handleSignUp() {
      this.$auth0.loginWithRedirect({
        appState: {
          targetPath: "/index",
        },
        authorizationParams: {
          prompt: "login",
          screen_hint: "signup",
        }
      });
    },
  },
};
</script>
