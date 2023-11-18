<template>
  <div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>

import axiosInstance from '../constant.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      agentsData: null,
      error: null
    }
  },
  async created () {
    try {
      // Use the configured axiosInstance from constant.js
      const response = await axiosInstance.get('agents')
      this.agentsData = response.data // Store the response data in your component data
      console.log(this.agentsData)
    } catch (error) {
      console.error('Error fetching data:', error)
      this.error = error // Store the error in your component data if needed
    }
  }
}
</script>

<style scoped>
/* Your component-specific styles go here */
</style>
