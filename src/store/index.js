import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    amount: 1,
    currencyList: [],

    //The default base currency
    baseCurrency: {
      name: "US Dollar",
      flagImg: "us.png",
      code: "USD"
    },

    //converted currencies in list
    convertedCurrencies: [],

    //history rate of selected currency
    openHistory: {
      show: false,
      currency: {}
    },
    
    //the state of currency selection menu display
    currencyMenu: {
      show: false,
      //was it invoked by 'change base currency' or 'add currency' in list?
      invoker: ''
    },

    //toggle about menu display
    aboutMenu: false,

    //state for error display when requests fails
    error: false,

    //warning display when currency select exceeds max allowed
    currencyMax: false
  },
  
  getters: {},
  
  mutations: {
    populateCurrencyList(state, payload) {
      state.currencyList = payload
    },
    
    toggleCurrencyMenu(state, invoker) {
      state.currencyMenu.show = !state.currencyMenu.show
      state.currencyMenu.invoker = state.currencyMenu.show ? invoker : ''
    },
    
    selectCurrency(state, currency) {
      if(state.currencyMenu.invoker == 'base' || state.currencyMenu.invoker == '') {
        state.baseCurrency = currency
      }
      
      if(state.currencyMenu.invoker == 'newcurrency') {
        //if error is in display before, hide it
        state.error = false
        
        //checks if currencies are not more than 6
        if(state.convertedCurrencies.length <= 5) {
          //chek if selected currency not alredy in converted list & base currency is not selected
          if(!state.convertedCurrencies.includes(currency)) {
            axios.get("https://api.exchangerate.host/convert?from="+state.baseCurrency.code+"&to="+currency.code+"&amount="+state.amount)
            .then((res) => {
              let data = Object.assign(currency, {result: res.data.result})
              state.convertedCurrencies.push(data)
            })
            .catch((error) => {
              state.error = true
            })
          }
        } else {
          state.currencyMax = true
          setTimeout(() => state.currencyMax = false, 7000)
        }
      }
    },
    
    toggleAboutMenu(state) {
      state.aboutMenu = !state.aboutMenu
    },
    
    pushConvertedCurrencies(state, data) {
      state.convertedCurrencies.push(data)
    },
    
    removeCurrency(state, currency) {
      state.convertedCurrencies = state.convertedCurrencies.filter((c) => c.code !== currency.code)
    },
    
    changeAmount(state, value) {
      state.amount = value
      return true
    },
    
    toggleError(state, value) {
      state.error = value
    },
    
    openHistory(state, currency) {
      state.openHistory.show = true
      state.openHistory.currency = currency
    },
    
    closeHistory(state) {
      state.openHistory.show = false
      state.openHistory.currency = {}
    }
  },
  
  
  actions: {
    async convertRollup(store) {
      await store.state.convertedCurrencies.forEach((currency, i) => {
        axios.get("https://api.exchangerate.host/convert?from="+store.state.baseCurrency.code+"&to="+currency.code+"&amount="+store.state.amount)
        .then((res) => {
          //store.state.convertedCurrencies[i].result = res.data.result
          currency.result = res.data.result
          store.commit('toggleError', false)
        })
        .catch((error) => {
          store.commit('toggleError', true)
        })
      })
    },
    
    setTheme(store, mode) {
      const doc = document.documentElement
      const setDarkBar = () => document.querySelector('meta[name=theme-color]').setAttribute("content", "#342345")
      const setLightBar = () => document.querySelector('meta[name=theme-color]').setAttribute("content", "#a855f7")
      
      if(mode == 'dark' || mode == 'light') {
        doc.className = ""
        doc.classList.add(mode)
        
        if(mode == 'dark') {
          setDarkBar()
        }
        else if(mode == 'light') {
          setLightBar()
        }
        
        localStorage.theme = mode
      }
      
      if(mode == 'system') {
        localStorage.removeItem('theme')
        if(window.matchMedia('(prefers-color-scheme: dark)').matches === true) {
          doc.className = ""
          doc.classList.add('dark')
          setDarkBar()
        } else {
          doc.className = ""
          doc.classList.add('light')
          setLightBar()
        }
      }
    }
  },
  
  
  modules: {}
})
