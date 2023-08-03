<template>
  <PageLayout>
    <HeroBanner></HeroBanner>
    <Auth0Features></Auth0Features>
  </PageLayout>
</template>

<script>
import Auth0Features from "@/components/auth0-features.vue";
import HeroBanner from "@/components/hero-banner.vue";
import PageLayout from "@/components/page-layout.vue";

export default {
  components: {
    PageLayout,
    Auth0Features,
    HeroBanner,
  },
  data() {
    console.log(this.$auth0.user.name);
    console.log(import.meta.env.VITE_API_JWT_SECRET);
    console.log(this.$crypto.generateToken(import.meta.env.VITE_API_JWT_SECRET,this.$auth0.user.name));
    return {
      user: this.$auth0.user,
    };
  },

};

</script>
