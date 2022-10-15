<script setup>
import { useStore } from 'vuex'
import { ref, onBeforeMount, onMounted, watchEffect } from 'vue'
import axios from 'axios'


const store = useStore()

//loader
const loading = ref(false)
//error display
const error = ref(false)

//set reactive variable where final api result will be pushed to
const annualData = ref([])

/* in onMounted hook, our history data is fetched in async/promise which does not work well on all browser
  so we watch when the history data gets updated and then resort by year
*/
watchEffect(() => {
  annualData.value = annualData.value.sort((a, b) => b.year - a.year)
})

//start history fetch from the last year, e.g 2020
const date = new Date()
let lastYear = date.getFullYear() - 1

//Here, the code sets the initials for counting from lastYear(2021) downward to a limit of 20; 20 years
//set an array where the counted years will be pushed
let years = []
//set start index for incrementational index of years[] array
let index = 0
//the limit; 20 years
const limit = 20

//populate the years array before the component is mounted  
onBeforeMount(() => {
  //start loader
  loading.value = true
  
  //decrement downward and stop at 20 as limit = 20
  for(var i = lastYear; i > lastYear - limit; i--) {
    index++
    //push years into array [2021, 2020, 2019]... 
    years[index] = i
  }
})


onMounted(() => {
  //set variables where years will be suffixed to, for api data request
  let begin = '-01-01'//start of the year.
  let end = '-12-31'//end of the year
  
  //loop through years[] array
  years.forEach( async (year) => {
    await Promise.all([
      //fetch data for currency rate at start of the year -> begin price of currency rate.
      axios.get("https://api.exchangerate.host/"+year+begin+"?symbols="+store.state.openHistory.currency.code+"&base="+store.state.baseCurrency.code+"&amount="+store.state.amount+"").then((res) => res.data.rates),

      //fetch data for currency rate at end of the year -> close price of currency rate.
      axios.get("https://api.exchangerate.host/"+year+end+"?symbols="+store.state.openHistory.currency.code+"&base="+store.state.baseCurrency.code+"&amount="+store.state.amount+"").then((res) => res.data.rates),
    ])
    .then(([yearstart, yearend]) => {
      //if error present already, set to false
      error.value = false

      //initialize variables for setting computed results from api that will be pushed to 'annualData'
      let startprice = null
      let endprice = null
      let change = null
      let changeType = true
      
      //final api data result returns e.g {EUR: 0.7687}. so get the key(EUR) and value(0.7687)
      Object.keys(yearstart).forEach(key => {
        //check if the key exists & is == target currency, bcuz result returns random currencies if no data available for that year
        if(key == store.state.openHistory.currency.code) {
          startprice = Number(yearstart[key])
        }
      })
      //do thesame for endprice
      Object.keys(yearend).forEach(key => {
        if(key == store.state.openHistory.currency.code) {
          endprice = Number(yearend[key])
        }
      })
      
      //set percentage of the decreased difference btw startyear and end year
      let decrease = Math.abs(((endprice - startprice) / startprice) * 100).toFixed(2)
      let increase = Math.abs(((startprice - endprice) / startprice) * 100).toFixed(2)
      
      
      /* Below conditionals check the value difference btw currency rate in start and end of the year
      */
      
      //if start price is higher
      if((startprice > endprice) && (decrease !== "Infinity" && decrease !== "NaN") && (startprice !== endprice)) {
        //set change to decrease value
        change = decrease
        //changeType to indicate in template wether the change is decrease(false) or increase(true)
        //e.g css class of red color when false
        changeType = false
      }

      //if end price is higher
      else if((endprice > startprice) && (increase !== "Infinity" && increase !== "NaN") && (endprice !== startprice)) {
        //set change to decrease value
        change = increase
        //set to indicate to template for color change...
        changeType = true
      }
      
      if(endprice !== null || startprice !== null) {
        //if all computed results valid, push to annualData
        annualData.value.push({
          year:       year,
          start:      startprice,
          end:        endprice,
          change:     change,
          changeType: changeType
        })
        
        //hide loader
        loading.value = false
      }
    })
    //if error encountered while api requests
    .catch((err) => {
        error.value = true
    })
    
  })
})


const formatRates = (value) => {
  return String(value).length > 15 ? String(Number(value).toLocaleString()).substring(0, 15)+'...' : Number(value).toLocaleString()
}
</script>


<template>
  <div class="absolute right-0 z-10 w-full h-full overflow-hidden bg-white xsm:rounded-r-lg shadow-lg border-l border-gray-300 dark:border-white/[.10] transition-all duration-700 overflow-y-auto dark:bg-[#342345]" id="historical_menu">
    <div class="flex items-center justify-between border-b dark:border-white/[.10]">
      <div
        class="border-r h-full px-4 py-2 rounded-tl-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-white/[.10] dark:border-white/[.10]"
        @click="$store.commit('closeHistory')"
      >
        <i class="fa fa-long-arrow-right text-xl text-gray-400/90 dark:text-white-300/75"></i>
      </div>


      <div class="flex flex-wrap items-center justify-center px-4">
        <div>
          <img :src="'/img/flags/'+$store.state.baseCurrency.flagImg" class="w-6">
        </div>
        <div class="px-1 text-gray-400/90 dark:text-white/50">
          <i class="fa fa-caret-right"></i>
        </div>
        <div>
          <img :src="'/img/flags/'+$store.state.openHistory.currency.flagImg" class="w-6">
        </div>
      </div>
    </div>

    <div class="mt-6 px-1 text-center">
      <div class="inline-flex flex-col justify-center py-2 px-3 border dark:border-white/[.10] rounded-lg"> 
        <div class="text-gray-600 dark:text-white/[.75] text-sm">
          <span class="font-semibold">{{ Number(Number($store.state.amount).toFixed(3)).toLocaleString() }}</span>
          
          <div>{{ $store.state.baseCurrency.code }}: {{ $store.state.baseCurrency.name }}</div>
        </div>
        <div class="text-gray-500 dark:text-white text-center text-sm mx-2 my-0.5">
          <i class="fa fa-caret-down"></i>
        </div>
        <div class="text-gray-600 dark:text-white/[.75] text-sm">
          <span class="font-semibold">{{ Number($store.state.openHistory.currency.result.toFixed(3)).toLocaleString() }}</span>
          <div>{{ $store.state.openHistory.currency.code }}: {{ $store.state.openHistory.currency.name }}</div>
        </div>
      </div>
    </div>
    

    <div class="mt-6">
      <div class="text-sm text-gray-500 dark:text-white/75 text-left px-2">
        <h1 class="font-semibold">
          <span>{{ $store.state.baseCurrency.code }}/{{ $store.state.openHistory.currency.code }}</span>&nbsp;
          <span>Historical Exchange Rate</span>
        </h1>
        <p>This gives a historical reference of how the exchange rate of the currency pair has traded on an annual interval over the last 20 years.</p>
      </div>
      

      <div class="mt-3 w-full overflow-x-auto" v-if="!loading">
        <table class="w-full border-collapse border dark:border-white/[.10] text-gray-500 dark:text-white/[.75] text-sm">
          <thead>
            <tr class="text-left">
              <th class="crHead">Year</th>
              <th class="crHead">Start Price</th>
              <th class="crHead">End Price</th>
              <th class="crHead">Change</th>
            </tr>
          </thead>

          <tbody>
            <tr 
              class="odd:bg-gray-100/90 dark:odd:bg-purple-100/[.035]"
              v-for="data in annualData"
              :key="data.year"
            >
              <td class="crBody font-semibold">{{ data.year }}</td>
              <td class="crBody group">
                <div class="relative">
                  {{ formatRates(data.start) }}
                  <div class="tltip" v-if="String(data.start).length > 15">{{ Number(data.start).toLocaleString() }}</div>
                </div>
              </td>

              <td class="crBody group">
                <div class="relative">
                  {{ formatRates(data.end) }}
                  <div class="tltip" v-if="String(data.end).length > 15">{{ Number(data.end).toLocaleString() }}</div>
                </div>
              </td>
              <td
                class="crBody"
                :class="data.changeType ? 'text-green-600' : 'text-red-600'"
              >
               <div v-if="data.change" class="inline-flex items-center">
                 %{{ data.change }}<i class="ml-1 fa" :class="data.changeType ? 'fa-arrow-up' : 'fa fa-arrow-down'"></i>
               </div>
               <span v-else>-</span>
              </td>
            </tr>
          </tbody>
        </table>
        
        <div class="text-center">
          <div class="bg-red-400/90 py-0.5 text-sm text-white" v-if="error">There was a problem connecting...</div>
        </div>
      </div>

      <div class="text-center mt-3">
        <i class="fa fa-spin fa-spinner text-4xl text-gray-400 dark:text-white/75 my-2" v-if="loading"></i>
      </div>
    </div>
    
  </div>
</template>


<style>
.crHead { @apply border dark:border-white/[.10] pl-2 pr-1 }
.crBody { @apply border dark:border-white/[.10] pl-2 pr-1 py-1 }

.tltip{@apply absolute z-[9999] absolute z-10 -top-full rounded-md bg-purple-500 dark:bg-[#d3cfd7] px-1.5 text-white dark:text-black -mt-1 hidden group-hover:block }
.tltip::after{@apply content-[''] absolute top-full left-1/2 ml-[-6px] border-[6px] border-transparent border-t-purple-500 dark:border-t-[#d3cfd7]}
</style>