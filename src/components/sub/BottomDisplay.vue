<template>
  <!--bottom-->
  <div class="grow bg-white/90 dark:bg-[#342345]/90 xsm:rounded-b-xl h-full relative" id="base" style="min-height:350px">
    
    <div class="helpers bh absolute bottom-full left-0 inline text-center leading-none pointer-events-none -mb-4 hidden">
      <div class="bg-white dark:bg-[#573975] rounded-lg p-2 text-sm text-gray-600 dark:text-white/90 shadow-lg w-32 -mb-0.5">
        Click to set as base currency
      </div>
      <i class="fa fa-play fa-rotate-90 text-white dark:text-[#573975] -ml-16"></i>
    </div>
    
    <div
      class="flex w-full items-center justify-between border-b dark:border-white/[.10] px-2 pb-2.5 pt-2"
      v-for="currency in $store.state.convertedCurrencies"
      :key="currency.result"
    >

      <div class="inline-flex flex-wrap items-center justify-center">
        <div class="cursor-pointer" @click="changeBaseCurrency(currency)">
          <i class="fa fa-long-arrow-up text-gray-400/90 dark:text-white/[.50] text-lg mr-1"></i>
        </div>
        <div class="cursor-pointer" @click="changeBaseCurrency(currency)">
          <img :src="'/img/flags/'+currency.flagImg" class="w-8">
        </div>
        <div class="flex flex-wrap flex-col ml-1 text-gray-500 dark:text-white/90">
          <div class="text-sm leading-none">{{ currency.code }}</div>
          <div class="text-sm leading-none w-28 lg:w-32 truncate hidden mic:inline text-gray-500/[.70] dark:text-white/[.55]">{{ currency.name }}</div>
        </div>
      </div>

      <div class="fle flex-wrap items-center">
          <div class="text-right">
            <div class="font-bold text-sm text-gray-500 dark:text-white/90 w-32 truncate">{{ Number(Number(currency.result).toFixed(3)).toLocaleString() }}</div>
            <div class="">
              <button
                class="rounded bg-purple-400 px-2 py-1 sm:py-0.5 text-white text-sm mr-1 font-semibold hover:bg-purple-500 dark:opacity-[85]"
                @click="$store.commit('openHistory', currency)"
              >
                More
              </button>
              <button
                class="rounded border-2 border-gray-400 px-1.5 py-0.5 sm:px-1 sm:py-0 text-gray-400 text-sm hover:bg-gray-400 hover:text-white"
                @click="$store.commit('removeCurrency', currency)"
              >
                <i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
      </div>

    </div>


    <div class="text-center my-3 px-2">
      <Transition
        enter-active-class="animate__animated animate__bounceIn animate__faster"
        leave-active-class="animate__animated animate__zoomOut animate__faster"
      >  
        <div class="text-sm text-gray-500 dark:text-white -mt-2 mb-2 font-semibold" v-if="$store.state.currencyMax">
          Max of 6 active currencies allowed. Remove a currency to add another.
        </div>
      </Transition>
      <Transition enter-active-class="animate__animated animate__slideInUp animate__faster">
        <button
          class="ring-purple-400 ring-offset-2 ring-1 bg-purple-400 px-2 py-1 xsm:py-0.5 text-white rounded hover:bg-purple-500 font-semibold text-sm dark:opacity-[.90]"
          :class="$store.state.convertedCurrencies.length ? '' : 'animate__animated animate__pulse animate__infinite'"
          @click="$store.commit('toggleCurrencyMenu', 'newcurrency')"
          v-show="$store.state.currencyList.length"
        >
          Add Currency
        </button>
      </Transition>
    </div>


  </div>
</template>

<script>
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()

    //when add currency is clicked
    const changeBaseCurrency = (currency) => {
    //add currency to convertedCurrency list in store
      store.commit('selectCurrency', currency)

      //refetch result of currenies in conversion list
      store.dispatch('convertRollup')
    }
    
    return { changeBaseCurrency }
  }
}
</script>