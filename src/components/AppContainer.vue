<template>
  <div class="bg-white/[.25] dark:bg-[#342345]/[.35] h-full xsm:h-auto sm:h-auto w-full xsm:w-10/12 xsm:border xsm:border-white/25 xsm:dark:border-[#3f2a54] sm:w-8/12 md:w-106 md:max-w-xl p-0 xsm:p-3 sm:p-3.5 xsm:rounded-xl xsm:mx-auto md:mx-0">
      <div class="w-full h-full sm:max-h-[700px] md:h-auto flex flex-col xsm:rounded-xl relative overflow-x-auto xsm:overflow-hidden">
        
          <TopDisplay />
                  
          <BottomDisplay/>
          
          <Transition
            enter-active-class="animate__animated animate__slideInRight animate__fast"
            leave-active-class="animate__animated animate__slideOutRight animate__fast"
          >
            <CurrencyList v-if="$store.state.currencyMenu.show"/>
          </Transition>
          
          <Transition
            enter-active-class="animate__animated animate__slideInRight animate__fast"
            leave-active-class="animate__animated animate__slideOutRight animate__fast"
          >  
            <Menu v-show="$store.state.aboutMenu"/>
          </Transition>
          
          <Transition
            enter-active-class="animate__animated animate__slideInRight animate__fast"
            leave-active-class="animate__animated animate__slideOutRight animate__fast"
          >  
            <HistoryRates v-if="$store.state.openHistory.show"/>
          </Transition>
                  
    </div>
  </div>
</template>

<script>
import TopDisplay from './sub/TopDisplay.vue'
import BottomDisplay from './sub/BottomDisplay.vue'
import Menu from './sub/Menu.vue'
import CurrencyList from './sub/CurrencyList.vue'
import HistoryRates from './sub/HistoryRates.vue'

export default {
  components: {
    TopDisplay, BottomDisplay, Menu, CurrencyList, HistoryRates
  }
}
</script>