import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


export const useCounterStore = defineStore('counter', () => {
  const categoryList = ref([])
  const getCategory = async () => {
    const res = await getCategoryAPI()
    console.log('getCategory:', res)
    categoryList.value = res.result
  }

  return { count, doubleCount, increment }
})
