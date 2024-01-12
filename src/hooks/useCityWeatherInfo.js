import axios from 'axios'
import { ref, reactive } from 'vue'
import { API_BASE_URL, theKey } from '@/config'

export default function () {
  const weatherData = ref(null)

  const fetchStatus = reactive({
    isLoading: false,
    isFailed: false
  })

  const fetchWeather = (cityName) => {
    fetchStatus.isLoading = true
    fetchStatus.isFailed = false
    axios.get(`${API_BASE_URL}current.json?key=${theKey}&q=${cityName}`)
      .then(res => res.json())
      .then(response => {
        console.log(response)
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
