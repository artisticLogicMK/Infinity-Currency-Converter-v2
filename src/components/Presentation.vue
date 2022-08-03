<template>
  <div class="text-center text-white/95 dark:text-white/75 hidden md:inline mb-3" :class="credit ? '' : 'mt-[6%]'">
    <img src="img/logo.svg" class="w-24 mx-auto opacity-95 dark:opacity-[.80] rotation">
    <h1 class="pb-0 text-2xl sm:text-3xl font-semibold mb-2">Infinity Converter</h1>
    <p class="text-base sm:text-lg pr-2 md:w-80 lg:w-96 lg:text-xl drop-shadow">A currency converter for quick view and comparison of live current & historical exchange rates between all globally recognized currencies and commodities.</p>
    <p class="text-base sm:text-lg mb-1">
      <a href="http://artisticlogicmk.one/" target="_blank" class="mx-1 drop-shadow hover:underline"><i class="fa fa-globe"></i> artisticlogicmk.one</a></p>
      
    <p class="mt-1 hidden md:inline">
      <span class="underline cursor-pointer" @click="credit = !credit">Credits</span>
      <button class="bg-white text-sm md:text-base py-0.5 px-2 rounded shadow-ld text-purple-600 font-semibold hover:bg-purple-100 dark:opacity-75 hidden">Help?</button>
      <button class="rounded-full w-8 h-8 border border-white/75 text-lg ml-2 hover:bg-white/25 dark:opacity-[80]" @click="$store.dispatch('setTheme', 'dark')">
        <i class="fa fa-moon-o"></i>
      </button>
      <button class="rounded-full w-8 h-8 border border-white/75 text-lg ml-2 hover:bg-white/25 dark:opacity-[80]" @click="$store.dispatch('setTheme', 'light')">
        <i class="fa fa-sun-o"></i>
      </button>
      <button class="rounded-full w-8 h-8 border border-white/75 text-lg ml-2 hover:bg-white/25 dark:opacity-[80]" @click="$store.dispatch('setTheme', 'system')">
        <i class="fa fa-desktop"></i>
      </button>
    </p>
    
    <div class="mt-2 text-sm" v-if="credit">
      <div>
        <p>Currency Conversion API</p>
        <p><a href="https://exchangerate.host"><i class="fa fa-globe"></i> https://exchangerate.host</a></p>
      </div>
      
      <div class="mt-2">
        <p>Country Flags</p>
        <p><a href="https://stefangabos.github.io/world_countries/"><i class="fa fa-globe"></i> stefangabos</a></p>
      </div>

      <div class="mt-2">
        <p>World Map Background</p>
        <p><a href="http://www.clker.com/clipart-purple-world-map.html"><i class="fa fa-globe"></i> www.clker.com</a></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const credit = ref(false)
</script>