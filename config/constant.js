// constant.js

import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

// Configure and use Axios with Vue-Axios
Vue.use(VueAxios, axios)

// Set the base URL for your API
Vue.axios.defaults.baseURL = 'http://localhost:8000/'

// Export the configured instance
export default Vue.axios
