import CallbackPage from "@/pages/callback-page.vue";
import Vue from "vue";
import Router from "vue-router";
import { authenticationGuard } from "../authentication-guard";

Vue.use(Router);

const NotFoundPage = () => import("@/pages/not-found-page.vue");
const ProfilePage = () => import("@/pages/profile-page.vue");
const PublicPage = () => import("@/pages/public-page.vue");
const ProtectedPage = () => import("@/pages/protected-page.vue");
const AdminPage = () => import("@/pages/admin-page.vue");
const Index = () => import("@/pages/index-page.vue");
const Dashboard = () => import("@/pages/Dashboard.vue");
const Query = () => import("@/pages/Query.vue");
const Instance = () => import("@/pages/Instance.vue");
const Inspect = () => import("@/pages/Inspect.vue");
const Role = () => import("@/pages/Role.vue");
const User = () => import("@/pages/User.vue");
const Workorder = () => import("@/pages/Workorder.vue");
const Workorder_data_export = () => import("@/pages/Workorder_data_export.vue");
const Pending = () => import("@/pages/Pending.vue");
const Historyorder = () => import("@/pages/Historyorder.vue");
const Historyorder_data_export = () =>
  import("@/pages/Historyorder_data_export.vue");
const Inception_show_variables = () =>
  import("@/pages/Inception_show_variables.vue");
const Inception_show_levels = () => import("@/pages/Inception_show_levels.vue");
const Desensitization_info = () => import("@/pages/Desensitization_info.vue");
const Slowlog_list = () => import("@/pages/Slowlog_list.vue");
const Query_log = () => import("@/pages/Query_log.vue");
const Process = () => import("@/pages/Process.vue");
const Tablesapce = () => import("@/pages/Tablesapce.vue");
const Innodb_trx = () => import("@/pages/Innodb_trx.vue");
const Trxandlocks = () => import("@/pages/Trxandlocks.vue");
const Instanceaccount = () => import("@/pages/Instanceaccount.vue");
const Param_list = () => import("@/pages/Param_list.vue");
const Instance_monitor = () => import("@/pages/Instance_monitor.vue");
const Sales_order = () => import("@/pages/Sales_order.vue");
const Exec_shell = () => import("@/pages/Exec_shell.vue");

const router = new Router({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/index",
      name: "首页",
      redirect: "/dashboard",
      component: Index,
      beforeEnter: authenticationGuard,
      children: [
        {
          path: "/dashboard",
          name: "首页面板",
          component: Dashboard,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/instances",
          name: "实例列表",
          component: Instance,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/inspect",
          name: "SQL审核",
          component: Inspect,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/select",
          name: "sql查询",
          component: Query,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/roles",
          name: "角色列表",
          component: Role,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/user",
          name: "用户列表",
          component: User,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/workorder",
          name: "我的SQL工单",
          component: Workorder,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/workorder_data_export",
          name: "我的数据导出工单",
          component: Workorder_data_export,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/pending",
          name: "待审批",
          component: Pending,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/historyorder",
          name: "历史SQL工单",
          component: Historyorder,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/historyorder_data_export",
          name: "历史数据导出工单",
          component: Historyorder_data_export,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/inception_show_variables",
          name: "审核规则",
          component: Inception_show_variables,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/inception_show_levels",
          name: "自定义审核级别",
          component: Inception_show_levels,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/get_desensitization_info_list",
          name: "获取脱敏字段列表",
          component: Desensitization_info,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/get_slowlog_list",
          name: "慢日志列表",
          component: Slowlog_list,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/get_query_log",
          name: "历史查询记录",
          component: Query_log,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/processlist",
          name: "会话管理",
          component: Process,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/tablesapce",
          name: "Top表空间",
          component: Tablesapce,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/innodb_trx",
          name: "事务信息",
          component: Innodb_trx,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/trxandlocks",
          name: "锁信息",
          component: Trxandlocks,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/instanceaccount",
          name: "数据库账号管理",
          component: Instanceaccount,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/param_list",
          name: "参数配置",
          component: Param_list,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/instance_monitor",
          name: "实时监控",
          component: Instance_monitor,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/get_sales_order",
          name: "sales_order",
          component: Sales_order,
          beforeEnter: authenticationGuard,
        },
        {
          path: "/exec_shell",
          name: "执行shell",
          component: Exec_shell,
          beforeEnter: authenticationGuard,
        },
      ],
    },
    {
      path: "/",
      name: "home",
      redirect: "/index",
      beforeEnter: authenticationGuard,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
      beforeEnter: authenticationGuard,
    },
    {
      path: "/public",
      name: "public",
      component: PublicPage,
    },
    {
      path: "/protected",
      name: "protected",
      component: ProtectedPage,
      beforeEnter: authenticationGuard,
    },
    {
      path: "/admin",
      name: "admin",
      component: AdminPage,
      beforeEnter: authenticationGuard,
    },
    {
      path: "/callback",
      name: "callback",
      component: CallbackPage,
    },
    {
      path: "*",
      name: "Not Found",
      component: NotFoundPage,
    },
  ],
});

export default router;
