<script setup>
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'

    const store = useStore()
    
    const currencyList =  ref()
    
    //search value
    const input = ref('')
    
    
    //list search: filter by input
    const search = () => {
      currencyList.value = store.state.currencyList
      currencyList.value = currencyList.value.filter((c) => c.code.toLowerCase().includes( input.value.toLowerCase()) || c.name.toLowerCase().includes(input.value.toLowerCase()) )
    }
    

    const changeBaseCurrency = (currency) => {
      store.commit('selectCurrency', currency)
      store.commit('toggleCurrencyMenu')
      store.dispatch('convertRollup')
    }


    onMounted(() => {
      currencyList.value = store.state.currencyList
    })
</script>


<template>
  <!--currency list right-->
  <div
    class="absolute right-0 -right_-2/4 w-full h-full bg-white dark:bg-[#342345] xsm:rounded-r-lg shadow-lg overflow-y-auto"
  >
  
    <div
      class="flex items-center border-b border-r dark:border-white/[.10] bg-white xsm:rounded-tl-lg rounded-br-lg dark:bg-[#342345] fixed"
    >
      <div
        class="border-r rounded-tl-lg h-full px-4 py-2.5 cursor-pointer hover:bg-gray-200 dark:hover:bg-white/25 dark:border-white/[.10]"
        @click="$store.commit('toggleCurrencyMenu')"
      >
        <i class="fa fa-long-arrow-right text-xl text-gray-400"></i>
      </div>
      <div class="px-2 py-1.5 grow">
        <input
          type="search"
          class=" text-gray-600 dark:text-white/75 outline-none text-base bg-transparent rounded px-2 py-1 w-full mic:w-[300px]"
          placeholder="🔎 currency code or country..."
          v-model="input"
          @keyup="search"
          @search="search"
        >
      </div>
    </div>

    <div class="mt-12 borer-t dark:border-white/[.10]">
      <div 
        class="flex items-center justify-between p-2.5 border-b dark:border-white/[.10] hover:bg-purple-100 dark:hover:bg-black/[.15]"
        v-for="currency in currencyList"
        :key="currency.code"
        @click="changeBaseCurrency(currency)"
      >
        <div class="flex items-center">
          <img
            :src="'/img/flags/'+currency.flagImg"
            class="w-6 inline mr-1"
          >
          <span
            class="text-gray-600 dark:text-white/[.85] text-base"
          >
            {{ currency.code }}
          </span>
        </div>

        <div
          class="text-gray-500 dark:text-white/[.65] text-sm"
        >
          {{ currency.name+' ('+currency.symbol+')'}}
        </div>
      </div>
    </div>
    
  </div>
</template>