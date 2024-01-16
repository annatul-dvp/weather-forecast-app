import { createStore } from 'vuex'
import { API_BASE_URL, theKey } from '@/config'
import axios from 'axios'
// import { ref } from 'vue'

export default createStore({
  state: {
    ip: null,
    userData: null,
    isUserDataLoading: false,
    currentCityWeatherData: null,
    citiesAmount: 0,
    realtimeWeather: []
  },
  getters: {
    isUserDataLoading (state) {
      return state.isUserDataLoading
    },
    currentCityWeatherData (state) {
      return state.currentCityWeatherData
    }
  },
  mutations: {
    setIP (state, ip) {
      state.ip = ip
    },
    setUserData (state, userData) {
      state.userData = userData
    },
    setUserDataLoading (state, isUserDataLoading) {
      state.isUserDataLoading = isUserDataLoading
    },
    setCurrentCityWeatherData (state, weatherData) {
      console.log(weatherData)
      state.currentCityWeatherData = weatherData
      console.log(state.currentCityWeatherData.location)
    }
  },
  actions: {
    async getUserIPData ({ commit }) {
      try {
        commit('setUserDataLoading', true)
        await axios
          .get('https://api.ipify.org?format=json')
          .then(response => {
            // console.log(response.data.ip)
            // console.log(this.state.ip)
            commit('setIP', response.data.ip)
          })
          .catch(error => {
            console.log(error)
          })
        await axios.get(`${API_BASE_URL}ip.json?key=${theKey}&q=${this.state.ip}`)
          .then(response => {
            // console.log(response.data)
            commit('setUserData', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        await axios.get(`${API_BASE_URL}current.json?key=${theKey}&q=${this.state.userData.city}`)
          // .then(res => res.json())
          .then(response => {
            // console.log('Данные по погоде получены:')
            // console.log(response.data)
            commit('setCurrentCityWeatherData', response.data)
            commit('setUserDataLoading', false)
          })
          .catch(error => {
            commit('setUserDataLoading', false)
            console.log(error)
          })
      } catch (error) {
        console.log('Ошибка:', error)
        throw error
      }
    }
    // getCurrentWeather (cityName) {
    //   return axios
    //     .get(`${API_BASE_URL}current.json?key=${theKey}&q=${cityName}`)
    //     .then(response => {
    //       console.log(response.data.ip)
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // }
  },
  modules: {
  }
})
