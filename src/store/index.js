import { createStore } from 'vuex'
import { API_BASE_URL, theKey } from '@/config'
import axios from 'axios'
// При переводе через Rapid API (Google translate) с использованием хука useTranslation
// import useTranslation from '@/hooks/useTranslation'
import useCityNameTranslation from '@/hooks/useCityNameTranslation'

export default createStore({
  state: {
    ip: null, // ip пользователя, по которому затем вычисляется его место расположение
    userData: null, // данные о пользователе и его расположении
    statuses: {
      isDataLoading: false,
      isDataFailed: false
    },
    currentWeatherData: null,
    forecastWeatherData: null,
    citiesAmount: 0,
    realtimeWeather: []
  },
  getters: {
    getDataStatuses (state) {
      console.log(state.statuses)
      return state.statuses
    },
    isDataLoading (state) {
      return state.statuses.isDataLoading
    },
    isDataFailed (state) {
      return state.statuses.isDataFailed
    },
    currentWeatherData (state) {
      return state.currentWeatherData
    },
    forecastWeatherData (state) {
      return state.forecastWeatherData
    }
  },
  mutations: {
    setIP (state, ip) {
      state.ip = ip
    },
    setUserData (state, userData) {
      state.userData = userData
    },
    setDataLoading (state, isDataLoading) {
      state.statuses.isDataLoading = isDataLoading
    },
    setDataFailed (state, isDataFailed) {
      state.statuses.isDataFailed = isDataFailed
    },
    setWeatherData (state, weatherData) {
      console.log(weatherData)
      state.currentWeatherData = {
        ...weatherData.current,
        country: weatherData.location.country,
        region: weatherData.location.region,
        city: weatherData.location.region
      }
      state.forecastWeatherData = weatherData.forecast.forecastday
    },
    setCityNameTranslation (state, translation) {
      console.log(translation)
      state.currentWeatherData = {
        ...state.currentWeatherData,
        countryRu: translation.nameTranslation.country,
        regionRu: translation.nameTranslation.region,
        cityRu: translation.nameTranslation.city
        /* При переводе через Rapid API (Google translate) с использованием хука useTranslation */
        // nameRu: translation.nameRu.trans,
        // countryRu: translation.countryRu.trans
      }
    }
  },
  actions: {
    // Default Data - data which are got from user data, his/her location
    async getDefaultData ({ commit }) {
      try {
        commit('setDataLoading', true)
        await axios
          // .get('https://api.ipify.org?format=json') // stoped working fow a while
          .get('https://api.seeip.org/jsonip')
          .then(response => {
            commit('setIP', response.data.ip)
          })
          .catch(error => {
            commit('setDataFailed', true)
            console.log(error)
          })
        await axios.get(`${API_BASE_URL}ip.json?key=${theKey}&q=${this.state.ip}`)
          .then(response => {
            // console.log(response.data)
            commit('setUserData', response.data)
          })
          .catch(error => {
            commit('setDataFailed', true)
            console.log(error)
          })
        await axios.get(`${API_BASE_URL}forecast.json?key=${theKey}&q=${this.state.userData.city}&days=3`)
          .then(response => {
            // console.log('Данные по погоде получены:')
            // console.log(response.data)
            commit('setWeatherData', response.data)
          })
          .catch(error => {
            commit('setDataFailed', true)
            console.log(error)
          })
        commit('setCityNameTranslation',
          await useCityNameTranslation(
            this.state.currentWeatherData.country,
            this.state.currentWeatherData.city,
            this.state.currentWeatherData.region
          )
        /* Данные необходимые для перевода с английского на русский через Rapid API (Google translate) */
        /* с использованием хука useTranslation */
        // {
        //   nameRu: await useTranslation(this.state.currentWeatherData.location.name),
        //   countryRu: await useTranslation(this.state.currentWeatherData.location.country)
        // }
        )
        commit('setDataLoading', false)
      } catch (error) {
        commit('setDataFailed', true)
        console.log('Ошибка:', error)
        throw error
      }
    }
  },
  modules: {
  }
})
