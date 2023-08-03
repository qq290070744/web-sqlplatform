<template>
<!--  <div v-if="$auth0.isLoading" class="page-layout">-->
<!--    <PageLoader/>-->
<!--  </div>-->
  <router-view v-if="isRouterAlive"></router-view>
</template>

<script>
import PageLoader from "@/components/page-loader.vue";

export default {
  components: {
    PageLoader,
  },
  name: 'app',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    }
  }
};
</script>
<style>

.el-message-box {
  width: 1000px !important;
  max-height: 80% !important;
  overflow: auto !important;
}

</style>
