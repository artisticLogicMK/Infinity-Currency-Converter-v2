<script setup>
import { useStore } from 'vuex'
import { ref, onMounted, watch } from 'vue'


const store = useStore()
const amount = ref(1)

watch(amount, () => {

  //allow only numbers and decimal point
  let clean = amount.value.toString().replace(/[^0-9.]/g, '')

  //change base currency amount in store
  store.commit('changeAmount', clean)

  //[input display] if [.] is pressed, remove value after point
  //and then reformat the string and add back value after [.]
  if(clean.includes('.')){
    amount.value = clean.split('.')[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")+'.'+clean.substr(clean.indexOf('.') + 1)

  //if no point detected, just reformat string only
  }else{
    amount.value = clean.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  }

  //run store action to recalculate the value of all currencies on list based on changed amount
  store.dispatch('convertRollup')
})


//when increament button is pressed
const increaseAmount = () => {
  if(! /^[.]+$/.test(amount.value)) {
    amount.value = (Number(amount.value.toString().replace(/[^0-9]/g, '')) + 1).toLocaleString()
  }
}


//when decreament button is pressed
const decreaseAmount = () => {
  if(amount.value !== '0' && amount.value !== '' && ! /^[.]+$/.test(amount.value)) {
    amount.value = (Number(amount.value.toString().replace(/[^0-9]/g, '')) - 1).toLocaleString()
  } 
}


onMounted(() => {
  amount.value = store.state.amount
})
</script>


<template>
  <!--responsive nav-->
  <div
    class="bg-gradient-to-tl from-purple-800 to-purple-400 xsm:from-purple-700/75 xsm:to-purple-400/75 dark:from-[#06020a] dark:to-[#381c52] xsm:dark:from-[#06020a]/75 xsm:dark:to-[#381c52]/75 xsm:rounded-t-xl pb-6 sm:pb-auto md:p-7 text-center"
  >
    <div class="flex flex-wrap justify-between items-center md:hidden mb-3">
      <div class="text-white dark:text-white/75 p-2">
        <img src="/img/logo.svg" class="w-6 inline rotation -mt-1 mr-0.5">
        <span class="text-lg font-semibold">Infinity Converter</span>
      </div>
        
      <div
        class="bars"
        @click="$store.commit('toggleAboutMenu')"
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>


    <!--base currency-->
    <div
      id="base"
      class="inline-flex flex-wrap items-center justify-center cursor-pointer mx-auto text-left relative pointer-events-auto group"
      @click="$store.commit('toggleCurrencyMenu', 'base')"
    >
      <div class="helpers absolute top-full inline text-center leading-none pointer-events-none hidden z-10">
        <i class="fa fa-play fa-rotate-270 text-white dark:text-[#573975]"></i>
        <div class="bg-white dark:bg-[#573975] rounded-lg p-2 text-sm text-gray-600 dark:text-white/90 shadow-lg w-32 -mt-0.5">
          Click to change base currency
        </div>
      </div>
      
      <div>
        <i class="fa fa-caret-left text-white dark:text-white/[80] text-xl mr-1 group-active:-translate-x-4 duration-300"></i>
      </div>
      <div>
        <img :src="'/img/flags/'+$store.state.baseCurrency.flagImg" class="w-8">
      </div>
      <div class="flex flex-wrap flex-col ml-1">
        <div
          class="text-white dark:text-white/[80] text-sm leading-none"
        >
          {{ $store.state.baseCurrency.code  }}
        </div>
        <div
          class="text-white dark:text-white/[80] text-xs leading-none"
        >
          {{ $store.state.baseCurrency.name }}
        </div>
      </div>
    </div>


    <!--value-->
    <div class="w-full mt-3 text-center flex justify-center items-center">
      <i class="fa fa-minus-circle text-2xl text-white/[.40] dark:text-white/25 leading-none cursor-pointer hover:opacity-75 active:scale-[1.2]" @click="decreaseAmount" @mousewheel="decreaseAmount"></i>

      <input type="text" class="text-white dark:text-white/90 border-none bg-transparent outline-none text-center text-base font-semibold font-mono w-3/6 mx-1 bg-re-400" maxlength="15" autocomplete="off" autofocus="true" v-model="amount">

      <i class="fa fa-plus-circle text-2xl text-white/[.40] dark:text-white/25 leading-none cursor-pointer hover:opacity-75 active:scale-[1.2]" @click="increaseAmount" @mousewheel="increaseAmount"></i>
    </div>
    
  </div>
  <div class="text-white text-xs xsm:text-sm px-1 py-0.5 bg-red-400/75 text-center w-full" v-if="$store.state.error">
    There was a problem connecting...
  </div>

</template>


<style>
.bars { @apply mr-3 mt-2 cursor-pointer hover:scale-[1.1] }
.bars div { @apply h-0.5 w-6 mb-1.5 bg-white dark:bg-white/75 }
</style>