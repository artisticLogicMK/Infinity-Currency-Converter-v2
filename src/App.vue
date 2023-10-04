<script setup>
import Presentation from './components/Presentation.vue'
import AppContainer from './components/AppContainer.vue'

import axios from 'axios'
import { useStore } from 'vuex'
import { onMounted, ref } from 'vue'


const store = useStore()
const currencies = ref()
const loaded = ref(false)

onMounted( async() => {
  //get currencyList and push to store
  await axios.get("./providers/currencies.json")
  .then((res) => {
    store.commit('populateCurrencyList', res.data.currencies.filter((c) => c.hide === false))
  })
  
  //fetch default currencies from list
  const defaults = store.state.currencyList.filter((c) => c.code == 'EUR' || c.code == 'BTC' || c.code == 'GHS' ||  c.code == 'XAG')

  //open elements
  loaded.value = true
  
  //convert default currencies and push to store
  await defaults.forEach((currency) => {
    axios.get("http://api.exchangerate.host/convert?access_key="+store.state.api+"&from="+store.state.baseCurrency.code+"&to="+currency.code+"&amount="+store.state.amount)
    .then((res) => {
      let data = Object.assign(currency,{result: res.data.result})
      store.commit('pushConvertedCurrencies', data)
    })
  })
})
</script>


<template>
  <div class="bg-[length:100%] md:bg-[length:95%] lg:bg-[length:75%] 2xl:bg-[length:610%] bg-center bg-no-repeat w-screen h-screen overflow-hidden xsm:overflow-y-scroll xsm:py-4 flex items-center bg-[url(../../../public/img/purple-world-map.svg)] dark:bg-[url(../../../public/img/dark_purple-world-map.svg)]">

    <div class="xsm:flex sm:flex-col md:flex-row ites-center m-auto justify-center bg-white dark:bg-[#342345] xsm:dark:bg-transparent xsm:bg-transparent h-full xsm:h-auto w-full">
      
      <Transition
        enter-active-class="animate__animated animate__flipInX animate__fast"
      >
        <Presentation v-if="loaded"/>
      </Transition>


      <Transition
        enter-active-class="animate__animated animate__fadeIn animate__fast"
      >
        <AppContainer v-if="loaded"/>
      </Transition>
        
    </div>

  </div>
</template>
