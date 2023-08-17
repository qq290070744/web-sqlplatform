<template>
  <div class="content-layout">
    <div class="content__body">
      <div class="profile-grid">
        <div class="profile__header" style="background-color: #1312">
          <img :src="user.picture" alt="Profile" class="profile__avatar" />
          <div class="profile__headline">
            <h2 class="profile__title">{{ user.name }}</h2>
            <span class="profile__description">{{ user.email }}</span>
          </div>
        </div>
        <div class="profile__details">
          <CodeSnippet title="Decoded ID Token" :code="code" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodeSnippet from "@/components/code-snippet.vue";

export default {
  components: {
    CodeSnippet,
  },
  data() {
    return {
      user: this.$auth0.user,
    };
  },
  computed: {
    code() {
      return JSON.stringify(this.user, null, 2);
    },
  },
};
</script>
