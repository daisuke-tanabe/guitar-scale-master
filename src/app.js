import './assets/scss/_reset.scss';
import Vue from 'vue';
import Home from './components/pages/Home.vue';

new Vue({
  el: '#app',
  components: { Home },
  template: '<Home />',
});
