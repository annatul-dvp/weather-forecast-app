import { createStore } from 'vuex'
import { API_BASE_URL, theKey } from '@/config'
import axios from 'axios'
// При переводе через Rapid API (Google translate) с использованием хука useTranslation
import useTranslation from '@/hooks/useTranslation'
import undateForecastWeatherData from '@/hooks/useForecastWeatherFormat'
import undateCurrentWeatherData from '@/hooks/useCurrentWeatherFormat'

export default createStore({
  state: {
    lang: 'en',
    websiteText: {
      mainLinkTxt: 'Home',
      linkAboutTxt: 'About',
      footerTxt: 'Pet-project. Created by Anna Tuluptseva. 2024',
      forecastTitleTxt: 'Weather forecast',
      inputPlaceholder: 'Enter city name',
      btnSearch: 'Search',
      loadingDataMsg: 'Data is loading...',
      errorLoadingDataMsg: 'Failed to load data',
      tempTxt: 'Temperature: ',
      feelslikeTxt: 'Feels like: ',
      humidityTxt: 'Humidity: ',
      precipTxt: 'Precipitation: ',
      pressureTxt: 'Pressure: ',
      sunriseTxt: 'Sunrise: ',
      sunsetTxt: 'Sunset: ',
      avgtempTxt: 'Avarage temperature: ',
      maxtempTxt: 'Max. temperature: ',
      mintempTxt: 'Min. temperature: '
    },
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
    getCurrentLang (state) {
      return state.lang
    },
    getWebsiteText (state) {
      return state.websiteText
    },
    getDataStatuses (state) {
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
    setLang (state, lang) {
      state.lang = lang
    },
    setWebsitedData (state) {
      if (state.lang === 'ru') {
        state.websiteText.mainLinkTxt = 'Главная'
        state.websiteText.linkAboutTxt = 'О сайте'
        state.websiteText.footerTxt = 'Pet-проект. Создан Анной Тулупцевой. 2024 г.'
        state.websiteText.forecastTitleTxt = 'Прогноз погоды'
        state.websiteText.inputPlaceholder = 'Введите город'
        state.websiteText.btnSearch = 'Найти'
        state.websiteText.loadingDataMsg = 'Идёт загрузка данных...'
        state.websiteText.errorLoadingDataMsg = 'Не удалось загрузить данные'
        state.websiteText.tempTxt = 'Температура: '
        state.websiteText.feelslikeTxt = 'Ощущается как: '
        state.websiteText.humidityTxt = 'Влажность: '
        state.websiteText.precipTxt = 'Осадки: '
        state.websiteText.pressureTxt = 'Давление: '
        state.websiteText.sunriseTxt = 'Рассвет: '
        state.websiteText.sunsetTxt = 'Закат: '
        state.websiteText.avgtempTxt = 'Средняя температура: '
        state.websiteText.maxtempTxt = 'Макс. температура: '
        state.websiteText.mintempTxt = 'Мин. температура: '
      } else {
        state.websiteText.mainLinkTxt = 'Home'
        state.websiteText.linkAboutTxt = 'About'
        state.websiteText.footerTxt = 'Pet-project. Created by Anna Tuluptseva. 2024'
        state.websiteText.forecastTitleTxt = 'Weather forecast'
        state.websiteText.inputPlaceholder = 'Enter city name'
        state.websiteText.btnSearch = 'Search'
        state.websiteText.loadingDataMsg = 'Data is loading...'
        state.websiteText.errorLoadingDataMsg = 'Failed to load data'
        state.websiteText.tempTxt = 'Temperature: '
        state.websiteText.feelslikeTxt = 'Feels like: '
        state.websiteText.humidityTxt = 'Humidity: '
        state.websiteText.precipTxt = 'Precipitation: '
        state.websiteText.pressureTxt = 'Pressure: '
        state.websiteText.sunriseTxt = 'Sunrise: '
        state.websiteText.sunsetTxt = 'Sunset: '
        state.websiteText.avgtempTxt = 'Avarage temperature: '
        state.websiteText.maxtempTxt = 'Max. temperature: '
        state.websiteText.mintempTxt = 'Min. temperature: '
      }
    },
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
      state.currentWeatherData = undateCurrentWeatherData(state.lang, weatherData.current, weatherData.location)

      state.forecastWeatherData = undateForecastWeatherData(state.lang, weatherData.forecast.forecastday)
    },
    changeCityNameLang (state, newName) {
      state.currentWeatherData = {
        ...state.currentWeatherData,
        city: newName
      }
    },
    changeCurrentWeatherData (state) {
      state.currentWeatherData = undateCurrentWeatherData(state.lang, state.currentWeatherData)
    },
    changeForecastWeatherData (state) {
      state.forecastWeatherData = undateForecastWeatherData(state.lang, state.forecastWeatherData)
    },
    setCityNameTranslation (state, translation) {
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
            // console.log(response.data.ip)
          })
          .catch(error => {
            commit('setDataFailed', true)
            console.log(error)
          })
        await axios.get(`${API_BASE_URL}ip.json?key=${theKey}&q=${this.state.ip}`)
          .then(response => {
            commit('setUserData', response.data)
            // console.log(response.data)
          })
          .catch(error => {
            commit('setDataFailed', true)
            console.log(error)
          })
        if (this.state.lang === 'en') {
          await axios.get(`${API_BASE_URL}forecast.json?key=${theKey}&q=${this.state.userData.city}&days=3`)
            .then(response => {
              commit('setWeatherData', response.data)
            })
            .catch(error => {
              commit('setDataFailed', true)
              console.log(error)
            })
        } else {
          await axios.get(`${API_BASE_URL}forecast.json?key=${theKey}&q=${this.state.userData.lat},${this.state.userData.lon}&days=3&lang=ru`)
            .then(response => {
              commit('setWeatherData', response.data)
            })
            .catch(error => {
              commit('setDataFailed', true)
              console.log(error)
            })
        }
        commit('setDataLoading', false)
      } catch (error) {
        commit('setDataFailed', true)
        console.log('Ошибка:', error)
        throw error
      }
    },
    async toTranslateCityName ({ commit }) {
      if (this.state.lang === 'ru') {
        commit('changeCityNameLang', (await useTranslation(this.state.currentWeatherData.city, 'en', 'ru')).trans)
      } else {
        commit('changeCityNameLang', (await useTranslation(this.state.currentWeatherData.city, 'ru', 'en')).trans)
      }
    }
  },
  modules: {
  }
})
