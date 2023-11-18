<template>
  <div>
    <div><input v-model="prefix" placeholder="Filter prefix"></div>

    <select size="5" v-model="selected">
      <option v-for="name in filteredNames" :key="name">{{ name }}</option>
    </select>

    <label>Name: <input v-model="first"></label>
    <label>Surname: <input v-model="last"></label>

    <div class="buttons">
      <button @click="create">Create</button>
      <button @click="update">Update</button>
      <button @click="del">Delete</button>
    </div>
  </div>
</template>

<script>
// import axiosInstance from '@/config/constant.js'
import { ref, reactive, computed, watch } from 'vue'

export default {
  name: 'HelloWorld',
  setup () {
    const agentsData = ref(null)
    const error = ref(null)

    const names = reactive(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman'])
    const selected = ref('')
    const prefix = ref('')
    const first = ref('')
    const last = ref('')

    const filteredNames = computed(() =>
      names.filter((n) =>
        n.toLowerCase().startsWith(prefix.value.toLowerCase())
      )
    )

    watch(selected, (name) => {
      [last.value, first.value] = name.split(', ')
    })

    const create = () => {
      if (hasValidInput()) {
        const fullName = `${last.value}, ${first.value}`
        if (!names.includes(fullName)) {
          names.push(fullName)
          first.value = last.value = ''
        }
      }
    }

    const update = () => {
      if (hasValidInput() && selected.value) {
        const i = names.indexOf(selected.value)
        names[i] = selected.value = `${last.value}, ${first.value}`
      }
    }

    const del = () => {
      if (selected.value) {
        const i = names.indexOf(selected.value)
        names.splice(i, 1)
        selected.value = first.value = last.value = ''
      }
    }

    const hasValidInput = () => {
      return first.value.trim() && last.value.trim()
    }

    // onMounted(async () => {
    //   try {
    //     const response = await axiosInstance.get('agents')
    //     agentsData.value = response.data
    //   } catch (err) {
    //     console.error('Error fetching data:', err)
    //     error.value = err
    //   }
    // })

    return {
      agentsData,
      error,
      prefix,
      selected,
      first,
      last,
      filteredNames,
      create,
      update,
      del
    }
  }
}
</script>

<style scoped>
* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>
