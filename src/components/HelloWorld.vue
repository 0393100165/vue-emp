<template>
  <div class="container">
    <div class="form-container">
      <span>enter agernt name and email to online auction</span>
      <div class="input-group">
        <label for="agentName">Agent Name:</label>
        <input id="agentName" v-model="agentName" placeholder="Agent Name">
      </div>

      <div class="input-group">
        <label for="agentEmail">Agent Email:</label>
        <input id="agentEmail" v-model="agentEmail" placeholder="Agent Email">
      </div>

      <div class="products-list">
        <h2>selected product to online auction</h2>
        <ul>
          <li v-for="product in productsData" :key="product.id">
            <strong>Name:</strong> {{ product.name }}<br>
            <strong>Description:</strong> {{ product.description }}
          </li>
        </ul>
      </div>

    </div>

    <div class="agents-list">
      <h2>Agents list after online auction</h2>
      <ul>
        <li v-for="agent in agentsData" :key="agent.id">
          <strong>Name:</strong> {{ agent.name }}<br>
          <strong>Email:</strong> {{ agent.email }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between;
  margin: 20px;
}

.form-container {
  width: 45%;
  padding: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.input-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.buttons button {
  margin-right: 10px;
  padding: 8px 16px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #45a049;
}

.agents-list,
.products-list {
  width: 45%;
}

.agents-list h2,
.products-list h2 {
  color: #333;
}

.agents-list ul,
.products-list ul {
  list-style: none;
  padding: 0;
}

.agents-list li,
.products-list li {
  margin-bottom: 15px;
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
</style>

<script>
import axiosInstance from '@/config/constant.js'
import { ref, computed, watch, onMounted } from 'vue'

export default {
  name: 'HelloWorld',
  setup () {
    const agentsData = ref([])
    const productsData = ref([])
    const error = ref(null)
    const prefix = ref('')
    const agentName = ref('')
    const agentEmail = ref('')
    const name = ref('')
    const email = ref('')
    const description = ref('')
    const selectedProduct = ref(null)

    const filteredProducts = computed(() =>
      productsData.value.filter(product =>
        product.name.includes(name) &&
        product.description.includes(email)
      )
    )

    watch(selectedProduct, (product) => {
      if (product) {
        [product.value.name, product.description.value] = [product.name, product.description]
      }
    })

    onMounted(async () => {
      try {
        const responseAgents = await axiosInstance.get('agents')
        agentsData.value = responseAgents.data

        const responseProducts = await axiosInstance.get('products')
        productsData.value = responseProducts.data
      } catch (err) {
        console.error('Error fetching data:', err)
        error.value = err
      }
    })

    return {
      agentsData,
      productsData,
      error,
      prefix,
      name,
      description,
      email,
      agentName,
      agentEmail,
      filteredProducts,
      selectedProduct
      // create,
      // update,
      // del
    }
  }
}
</script>
