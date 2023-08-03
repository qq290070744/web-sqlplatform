import Vue from "vue";
import App from "./app.vue";
import "./assets/css/styles.css";
import router from "./router";
import {Auth0Plugin} from "./auth0-plugin";
import crypto from "./crypto";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import './assets/css/global.css'
import "codemirror/theme/dracula.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "markdown-it-vue/dist/markdown-it-vue.css"
import "highlight.js/styles/darcula.css"
import "codemirror/addon/hint/sql-hint"
import "codemirror/addon/display/placeholder"
import echarts from 'echarts'
Vue.prototype.$crypto = crypto;


Vue.use(Auth0Plugin, {
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    redirectUri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    onRedirectCallback: (appState) => {
        router.push(
            appState && appState.targetPath
                ? appState.targetPath
                : window.location.pathname
        );
    },
});

Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
