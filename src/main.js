import Vue from 'vue';
import mavonEditor from 'mavon-editor';
import App from './App.vue';
import 'mavon-editor/dist/css/index.css';

Vue.config.productionTip = false;

Vue.use(mavonEditor);

new Vue({
  render: h => h(App),
}).$mount('#app');
