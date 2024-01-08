import { createStore } from 'vuex'

export default createStore({
  state: {
    citiesAmount: 0,
    realtimeWeather: []
  },
  getters: {
  },
  mutations: {
    updateRealtimeWeather (state, weatherData) {
      console.log(weatherData)
      const placeIndex = state.realtimeWeather.find(w => w.country === weatherData.location.country && w.city === weatherData.location.name)
      if (placeIndex) {
        console.log(placeIndex)
        state.realtimeWeather = state.realtimeWeather.map(w => {
          if (w.country === weatherData.location.country && w.city === weatherData.location.name) {
            return {
              ...w,
              currentTemp: weatherData.current.temp_c,
              currentTempFeelsLike: weatherData.current.feelslike_c,
              humidity: weatherData.current.humidity
            }
          } else {
            return w
          }
        })
        // state.realtimeWeather[placeIndex] = {
        //   ...objct,
        //   currentTemp: weatherData.current.temp_c,
        //   currentTempFeelsLike: weatherData.current.feelslike_c,
        //   humidity: weatherData.current.humidity
        // }
      } else {
        state.citiesAmount += 1
        state.realtimeWeather.push({
          id: state.citiesAmount,
          country: weatherData.location.country,
          city: weatherData.location.name,
          currentTemp: weatherData.current.temp_c,
          currentTempFeelsLike: weatherData.current.feelslike_c,
          humidity: weatherData.current.humidity
        })
      }
      console.log(state.realtimeWeather)
    }
  },
  actions: {
    getRealtimeWeather (context) {
      return fetch('http://api.weatherapi.com/v1/current.json?key=c9afb28b055240ea928174126230611&q=Kursk')
        .then(res => res.json())
        .then(response => {
          console.log(response)
          context.commit('updateRealtimeWeather', response)
        })
    },
    findTheCity (context) {
      return fetch('http://api.weatherapi.com/v1/search.json?key=c9afb28b055240ea928174126230611&q=lond')
        .then(res => res.json())
        .then(response => {
          console.log(response)
          // context.commit('updateRealtimeWeather', response)
        })
    }
  },
  modules: {
  }
})
