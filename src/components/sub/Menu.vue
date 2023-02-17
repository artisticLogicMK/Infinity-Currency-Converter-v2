<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const themeMenu = ref(false)

const setTheme = (mode) => {
  themeMenu.value = false
  store.dispatch('setTheme', mode)
}
</script>


<template>
  <div
    class="absolute right-0 w-full xsm:w-full h-full md:hidden bg-gradient-to-tl from-purple-700/90 to-purple-400/90 dark:from-[#06020a]/90 dark:to-[#381c52]/90 xsm:rounded-r-lg shadow-lg border-none xsm:border-l border-white/75 dark:border-white/25"
  >
    
    <div
      class="flex items-center border-b border-white/50 dark:border-white/25"
    >
      <div
        class="border-r border-white/50 dark:border-white/25 h-full px-4 py-2.5 cursor-pointer hover:bg-purple-100/25"
        @click="$store.commit('toggleAboutMenu')"
      >
        <i class="fa fa-long-arrow-right text-xl text-white dark:text-white/75"></i>
      </div>
      <div class="px-2 py-1.5 grow text-right">
        <button class="bg-white text-sm py-1.5 px-2 rounded shadow-ld text-purple-500 font-semibold active:bg-purple-100 dark:opacity-90 hidden">Help?</button>
        
        <button
          class="rounded-full py-1 px-2.5 border border-white-500 text-white text-base ml-3 active:bg-white/25 dark:opacity-90 relative"
          @click.self="themeMenu = !themeMenu"
        >
            <i class="fa fa-lightbulb-o px-0.5" @click="themeMenu = !themeMenu"></i>
            
            <Transition
              enter-active-class="animate__animated animate__slideInRight animate__faster"
              leave-active-class="animate__animated animate__slideOutRight animate__faster"
            >
              <div class="absolute z-10 rounded-md overflow-hidden right-0 mt-2 shadow-lg bg-white dark:bg-[#342345]" v-if="themeMenu">
                <div class="menuItem border-b dark:border-white/[.15]" @click="setTheme('light')">
                  <i class="fa fa-sun-o"></i> &nbsp;&nbsp;<span>Light</span>
                </div>
                
                <div class="menuItem dark:text-white/90 border-b dark:border-white/[.15]" @click="setTheme('dark')">
                  <i class="fa fa-moon-o"></i> &nbsp;&nbsp;<span>Dark</span>
                </div>
                
                <div class="menuItem dark:text-white/90" @click="setTheme('system')">
                  <i class="fa fa-desktop"></i> &nbsp;&nbsp;<span>System</span>
                </div>
              </div>
            </Transition>
          </button>
      </div>
    </div>

    <div class="text-white dark:text-white/90 text-center p-3 z-0">
      <img src="/img/logo.svg" class="w-16 mx-auto opacity-9 dark:opacity-90">
      <h1 class="pb-0 text-xl font-semibold mb-2 drop-shadow inline">Infinity Converter</h1>
      <p class="text-base drop-shadow">A currency converter for quick view and comparison of live current & historical exchange rates between all globally recognized currencies and commodities.</p>
      <p class="text-base mt-1">
        <a href="https://github.com/artisticLogicMK/Infinity-Currency-Converter-v2" target="_blank" class="mx-1 drop-shadow hover:underline"><i class="fa fa-github"></i> Github Repo</a>
      </p>
    </div>
    
    <div class="text-center text-white mt-4 text-sm">
      <p class="text-base font-semibold underline drop-shadow">Credits</p>
      
      <div class="">
        <p class="drop-shadow">Currency Conversion API</p>
        <p><a href="https://exchangerate.host" class="drop-shadow"><i class="fa fa-globe"></i> https://exchangerate.host</a></p>
      </div>
      
      <div class="mt-4">
        <p>Country Flags</p>
        <p class="drop-shadow"><i class="fa fa-user"></i> stefangabos</p>
        <p><a href="https://stefangabos.github.io/world_countries/" class="drop-shadow"><i class="fa fa-globe"></i> stefangabos.github.io/world_countries/</a></p>
      </div>

      <div class="mt-4">
        <p>World Map Background</p>
        <p><a href="http://www.clker.com/clipart-purple-world-map.html" class="drop-shadow"><i class="fa fa-globe"></i> www.clker.com</a></p>
      </div>
    </div>
    
  </div>
</template>

<style>
.menuItem { @apply bg-transparent px-3 py-1.5 text-base font-semibold text-gray-500/90 text-left w-28 hover:bg-black/[.15] cursor-pointer dark:text-white/90 }
.menuItem i { @apply text-purple-400 dark:text-white/90 }
</style>