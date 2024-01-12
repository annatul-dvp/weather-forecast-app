import { createStore } from 'vuex'
import { API_BASE_URL, theKey } from '@/config'
import axios from 'axios'
// import { ref } from 'vue'

export default createStore({
  state: {
    userData: null,
    loading: false,
    ip: null,
    citiesAmount: 0,
    realtimeWeather: []
  },
  getters: {
  },
  mutations: {
    setUserData (state, userData) {
      state.userData = userData
    },
    setLoading (state, loading) {
      state.loading = loading
    },
    setIP (state, ip) {
      state.ip = ip
    }
    // updateRealtimeWeather (state, weatherData) {
    //   console.log(weatherData)
    //   const placeIndex = state.realtimeWeather.find(w => w.country === weatherData.location.country && w.city === weatherData.location.name)
    //   if (placeIndex) {
    //     console.log(placeIndex)
    //     state.realtimeWeather = state.realtimeWeather.map(w => {
    //       if (w.country === weatherData.location.country && w.city === weatherData.location.name) {
    //         return {
    //           ...w,
    //           currentTemp: weatherData.current.temp_c,
    //           currentTempFeelsLike: weatherData.current.feelslike_c,
    //           humidity: weatherData.current.humidity
    //         }
    //       } else {
    //         return w
    //       }
    //     })
    //   } else {
    //     state.citiesAmount += 1
    //     state.realtimeWeather.push({
    //       id: state.citiesAmount,
    //       country: weatherData.location.country,
    //       city: weatherData.location.name,
    //       currentTemp: weatherData.current.temp_c,
    //       currentTempFeelsLike: weatherData.current.feelslike_c,
    //       humidity: weatherData.current.humidity
    //     })
    //   }
    //   console.log(state.realtimeWeather)
    // }
  },
  actions: {
    getUserIP ({ commit }) {
      commit('setLoading', true)
      axios
        .get('https://api.ipify.org?format=json')
        .then(response => {
          console.log(response.data.ip)
          // this.ip = response.data.ip
          // console.log(this.ip)
          commit('setIP', response.data.ip)
          commit('setUserData', response.data)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
      console.log(this.ip)
    },
    async getUserIPData ({ commit }) {
      try {
        commit('setLoading', true)
        await axios
          .get('https://api.ipify.org?format=json')
          .then(response => {
            console.log(response.data.ip)
            // console.log(this.state.ip)
            commit('setIP', response.data.ip)
            commit('setLoading', false)
          })
          .catch(error => {
            console.log(error)
            commit('setLoading', false)
          })
        await axios.get(`${API_BASE_URL}ip.json?key=${theKey}&q=${this.state.ip}`)
          .then(response => {
            console.log(response)
            commit('setUserData', response.data)
          })
          .catch(error => {
            console.log(error)
          })
      } catch (error) {
        console.log('Ошибка:', error)
        throw error
      }

      // console.log('вызван')
      const f = function (src) {
        if (src.startsWith('https://api.ipify.org')) {
          commit('setLoading', true)
          axios
            .get(src)
            .then(response => {
              console.log(response.data.ip)
              // console.log(this.state.ip)
              commit('setIP', response.data.ip)
              commit('setLoading', false)
            })
            .catch(error => {
              console.log(error)
              commit('setLoading', false)
            })
        }
        if (src.startsWith(API_BASE_URL)) {
          axios.get(src)
            // .then(res => res.json())
            .then(response => {
              console.log(response)
              commit('setUserData', response.data)
            })
            .catch(error => {
              console.log(error)
              commit('setLoading', false)
            })
        }
      }
      // `${API_BASE_URL}ip.json?key=${theKey}&q=178.17.181.199`,
      Promise.all(['https://api.ipify.org?format=json',
        `${API_BASE_URL}ip.json?key=${theKey}&q=${this.state.ip}`]
        .map((src) => {
          console.log(src)
          return f(src)
        }
        )
      )

      // axios.get(`${API_BASE_URL}ip.json?key=${theKey}q=auto:${this.ip}`)
      //   .then(res => res.json())
      //   .then(response => {
      //     console.log(this.ip)
      //     console.log(response)
      //   })
      //   .catch(() => {
      //     console.error()
      //   })
    }
    // getRealtimeWeather (context) {
    //   return fetch('http://api.weatherapi.com/v1/current.json?key=c9afb28b055240ea928174126230611&q=Kursk')
    //     .then(res => res.json())
    //     .then(response => {
    //       console.log(response)
    //       context.commit('updateRealtimeWeather', response)
    //     })
    // },
    // findTheCity (context) {
    //   return fetch('http://api.weatherapi.com/v1/search.json?key=c9afb28b055240ea928174126230611&q=lond')
    //     .then(res => res.json())
    //     .then(response => {
    //       console.log(response)
    //       // context.commit('updateRealtimeWeather', response)
    //     })
    // }
  },
  modules: {
  }
})
