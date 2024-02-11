import axios from 'axios'
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex'
import undateCurrentWeatherData from './useCurrentWeatherFormat'
import { API_BASE_URL, theKey } from '@/config'

export default function () {
  const $store = useStore()
  const lang = computed(() => $store.getters.getCurrentLang)
  const weatherData = ref(null)

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false
  })

  function fetchWeather (cityName) {
    fetchStatus.isLoading = true
    fetchStatus.isFailed = false
    axios.get(`${API_BASE_URL}current.json?key=${theKey}&q=${cityName}`)
      .then(response => {
        // weatherData.value = Object.assign(response.data.current, { city: cityName })
        weatherData.value = undateCurrentWeatherData(lang, response.data.current, response.data.location)
      })
      .catch(() => { fetchStatus.isFailed = true })
      .then(() => { fetchStatus.isLoading = false })
  }

  return {
    weatherData,
    status: fetchStatus,

    fetchWeather
  }
}
