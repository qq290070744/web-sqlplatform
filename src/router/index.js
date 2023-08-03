import HomePage from "@/pages/home-page.vue";
import CallbackPage from "@/pages/callback-page.vue";
import Vue from "vue";
import Router from "vue-router";
import {authenticationGuard} from "../authentication-guard";
import Dashboard from "@/pages/Dashboard.vue";
import Instance from "@/pages/Instance.vue";
import Inspect from "@/pages/Inspect.vue";
import Query from "@/pages/Query.vue";
import Role from "@/pages/Role.vue";
import User from "@/pages/User.vue";
import Workorder from "@/pages/Workorder.vue";
import Workorder_data_export from "@/pages/Workorder_data_export.vue";
import Pending from "@/pages/Pending.vue";
import Historyorder from "@/pages/Historyorder.vue";
import Historyorder_data_export from "@/pages/Historyorder_data_export.vue";
import Inception_show_variables from "@/pages/Inception_show_variables.vue";
import Inception_show_levels from "@/pages/Inception_show_levels.vue";
import Desensitization_info from "@/pages/Desensitization_info.vue";
import Slowlog_list from "@/pages/Slowlog_list.vue";
import Query_log from "@/pages/Query_log.vue";
import Process from "@/pages/Process.vue";
import Tablesapce from "@/pages/Tablesapce.vue";
import Innodb_trx from "@/pages/Innodb_trx.vue";
import Trxandlocks from "@/pages/Trxandlocks.vue";
import Instanceaccount from "@/pages/Instanceaccount.vue";
import Param_list from "@/pages/Param_list.vue";
import Instance_monitor from "@/pages/Instance_monitor.vue";
import Sales_order from "@/pages/Sales_order.vue";
import Exec_shell from "@/pages/Exec_shell.vue";

Vue.use(Router);

const NotFoundPage = () => import("@/pages/not-found-page.vue");
const ProfilePage = () => import("@/pages/profile-page.vue");
const PublicPage = () => import("@/pages/public-page.vue");
const ProtectedPage = () => import("@/pages/protected-page.vue");
const AdminPage = () => import("@/pages/admin-page.vue");
const Index = () => import("@/pages/index-page.vue");
// const Dashboard = () => import("@/pages/Dashboard-page");


const router = new Router({
    mode: "history",
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/index',
            name: '首页',
            redirect: '/dashboard',
            component: Index,
            children: [
                {
                    path: '/dashboard',
                    name: '首页面板',
                    component: Dashboard,
                    beforeEnter: authenticationGuard,
                },
                {
                    path: '/instances',
                    name: '实例列表',
                    component: Instance
                },
                {
                    path: '/inspect',
                    name: 'SQL审核',
                    component: Inspect
                },
                {
                    path: '/select',
                    name: 'sql查询',
                    component: Query
                },
                {
                    path: '/roles',
                    name: '角色列表',
                    component: Role
                },
                {
                    path: '/user',
                    name: '用户列表',
                    component: User
                },
                {
                    path: '/workorder',
                    name: '我的SQL工单',
                    component: Workorder
                },
                {
                    path: '/workorder_data_export',
                    name: '我的数据导出工单',
                    component: Workorder_data_export
                },
                {
                    path: '/pending',
                    name: '待审批',
                    component: Pending
                },
                {
                    path: '/historyorder',
                    name: '历史SQL工单',
                    component: Historyorder
                },
                {
                    path: '/historyorder_data_export',
                    name: '历史数据导出工单',
                    component: Historyorder_data_export
                },
                {
                    path: '/inception_show_variables',
                    name: '审核规则',
                    component: Inception_show_variables
                },
                {
                    path: '/inception_show_levels',
                    name: '自定义审核级别',
                    component: Inception_show_levels
                },
                {
                    path: '/get_desensitization_info_list',
                    name: '获取脱敏字段列表',
                    component: Desensitization_info
                },
                {
                    path: '/get_slowlog_list',
                    name: '慢日志列表',
                    component: Slowlog_list
                },
                {
                    path: '/get_query_log',
                    name: '历史查询记录',
                    component: Query_log
                },
                {
                    path: '/processlist',
                    name: '会话管理',
                    component: Process
                },
                {
                    path: '/tablesapce',
                    name: 'Top表空间',
                    component: Tablesapce
                },
                {
                    path: '/innodb_trx',
                    name: '事务信息',
                    component: Innodb_trx
                },
                {
                    path: '/trxandlocks',
                    name: '锁信息',
                    component: Trxandlocks
                },
                {
                    path: '/instanceaccount',
                    name: '数据库账号管理',
                    component: Instanceaccount
                },
                {
                    path: '/param_list',
                    name: '参数配置',
                    component: Param_list
                },
                {
                    path: '/instance_monitor',
                    name: '实时监控',
                    component: Instance_monitor
                },
                {
                    path: '/get_sales_order',
                    name: 'sales_order',
                    component: Sales_order
                },
                {
                    path: '/exec_shell',
                    name: '执行shell',
                    component: Exec_shell
                },
            ]
        },
        {
            path: "/",
            name: "home",
            redirect: '/index',
            // component: HomePage,
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
