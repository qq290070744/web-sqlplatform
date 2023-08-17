<template>
  <el-container>
    <el-header>
      <div>
        <img src="../assets/timg.jpg" />
        <span>{{ env_info }} 数据库运维管理平台 </span>
      </div>
      <div>
        <el-menu
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#3c7799"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-badge :is-dot="count == 0 || !count ? false : true">
            <el-submenu index="1">
              <template slot="title">
                <el-avatar
                  :size="50"
                  fit="scale-down"
                  :src="require('../assets/touxiang.jpg')"
                ></el-avatar>
                <span style="color: #fff; font-size: 15px">{{ username }}</span>
              </template>
              <el-menu-item index="1-1" @click="toPending" v-if="isShow">
                <el-badge
                  :value="count == 0 || !count ? 0 : count"
                  :hidden="count == 0 || !count ? true : false"
                >
                  <i
                    class="iconfont icon-daishenpizhishi"
                    style="margin-right: 10px"
                  ></i
                  >待审批
                </el-badge>
              </el-menu-item>
              <el-menu-item index="1-2" @click="handleLogout">
                <i
                  class="iconfont icon-tuichudenglu"
                  style="margin-right: 10px"
                ></i
                >退出
              </el-menu-item>
            </el-submenu>
          </el-badge>
        </el-menu>
      </div>
    </el-header>
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="asideCon" @click="rl">
          <i :class="rlicon"></i>
        </div>
        <el-menu
          class="aside_menu"
          @select="handleSelect"
          :unique-opened="true"
          :collapse="isCollapse"
          :default-active="activeIndex"
          background-color="#3c7792"
          router
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <template slot="title">
              <i :class="item.icon"></i>
              &nbsp;
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item :index="child.path" v-for="child in item.children">
              <template>
                <i :class="child.icon"></i>
                <span slot="title">{{ child.title }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {
  getEnv,
  getMenu,
  pending,
  dataExportPending,
} from "@/services/message.service";

export default {
  name: "index-page",
  data() {
    return {
      username: this.$auth0.user.name,
      Authorization: this.$crypto.generateToken(
        import.meta.env.VITE_API_JWT_SECRET,
        this.$auth0.user.name
      ),
      menulist: [],
      isCollapse: false,
      asideWidth: "200px",
      rlicon: "el-icon-d-arrow-left",
      activeIndex: "0",
      count: 0,
      isShow: true,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        password: "",
        oldpassword: "",
      },
      formLabelWidth: "120px",
      timer_pendingOrder: "",
      env_info: "",
    };
  },
  created() {
    this.username = this.$auth0.user.name;
    this.get_env();
    this.get_pendingOrder();
    this.timer_pendingOrder = setInterval(this.get_pendingOrder, 30000);
  },
  async mounted() {
    await this.get_menu();
  },
  methods: {
    toPending() {
      this.$router.push("/pending");
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
    rl() {
      this.isCollapse ? (this.isCollapse = false) : (this.isCollapse = true);
      this.isCollapse
        ? (this.rlicon = "el-icon-d-arrow-right")
        : (this.rlicon = "el-icon-d-arrow-left");
    },
    handleLogout() {
      this.$auth0.logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    },
    async get_menu() {
      //this.Authorization = this.$crypto.generateToken(import.meta.env.VITE_API_JWT_SECRET, this.$auth0.user.name)
      if (
        this.$auth0.user.name === "" ||
        this.$auth0.user.name === null ||
        this.$auth0.user.name === undefined
      ) {
        if (
          this.$auth0.user.nickname === "" ||
          this.$auth0.user.nickname === null ||
          this.$auth0.user.nickname === undefined
        ) {
          this.username = this.$auth0.user.sub;
          this.$auth0.user.name = this.$auth0.user.sub;
        } else {
          this.username = this.$auth0.user.nickname;
          this.$auth0.user.name = this.$auth0.user.nickname;
        }
      }
      const { data, error } = await getMenu(
        this.$crypto.generateToken(
          import.meta.env.VITE_API_JWT_SECRET,
          this.$auth0.user.name
        )
      );
      if (data) {
        this.menulist = data.data;
        console.log(this.menulist);
      }
      if (error) {
        this.message = JSON.stringify(error, null, 2);
        this.$notify.error({
          title: "错误",
          message: this.message,
        });
      }
    },
    async get_env() {
      const { data, error } = await getEnv(this.Authorization);
      if (data) {
        this.env_info = data.env;
      }
      if (error) {
        this.$notify.error({
          title: "错误",
          message: JSON.stringify(error, null, 2),
        });
      }
    },
    async get_pendingOrder() {
      await this.get_menu();
      window.localStorage.setItem("username", this.$auth0.user.name);
      window.localStorage.setItem(
        "token",
        this.$crypto.generateToken(
          import.meta.env.VITE_API_JWT_SECRET,
          this.$auth0.user.name
        )
      );
      this.count = 0;
      const { data, error } = await pending(
        this.$crypto.generateToken(
          import.meta.env.VITE_API_JWT_SECRET,
          this.$auth0.user.name
        )
      );
      if (data) {
        this.count += data.total;
      }
      const { data: res, error1 } = await dataExportPending(
        this.$crypto.generateToken(
          import.meta.env.VITE_API_JWT_SECRET,
          this.$auth0.user.name
        )
      );
      if (res) {
        this.count += res.total;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.el-badge {
  display: flex;
}

.p_class {
  margin-right: 10px;
}

.el-container {
  height: 100%;

  .el-header {
    background-color: #3c7799;
    padding-left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
      height: 100%;

      img {
        height: 100%;
        border-radius: 30%;
      }

      span {
        color: #fff;
        font-size: 25px;
        margin-left: 10px;
      }
    }
  }

  .el-aside {
    background-color: #3c7792;

    .asideCon {
      i {
        margin-left: 45%;
        cursor: pointer;
      }
    }

    .aside_menu {
      background-color: #3c7792;
      border-right: 0;
      transition: width 1ms;

      el-submenu {
        background-color: #3c7792;
      }

      .el-menu-item {
        background-color: #3c7792;
        transition: width 3s;
      }
    }
  }

  .el-main {
    background-color: aliceblue;
  }
}
</style>
<style>
.el-badge__content.is-dot {
  margin-top: 10px !important;
}

.iconfont {
  margin-right: 5px;
  margin-left: 3px;
}
</style>
