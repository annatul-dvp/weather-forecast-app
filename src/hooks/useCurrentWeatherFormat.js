import numberFormat from '@/helpers/NumberFormat.js'

export default function undateCurrentWeatherData (lang, weatherData, locationData) {
  let currentWeatherData = null
  if (locationData) {
    currentWeatherData = {
      ...weatherData,
      country: locationData.country,
      region: locationData.region,
      city: locationData.name,
      temp_c_txt: numberFormat(lang, 'celsius', weatherData.temp_c),
      temp_f_txt: numberFormat(lang, 'fahrenheit', weatherData.temp_f),
      feelslike_c_txt: numberFormat(lang, 'celsius', weatherData.feelslike_c),
      feelslike_f_txt: numberFormat(lang, 'fahrenheit', weatherData.feelslike_f),
      precip_mm_txt: numberFormat(lang, 'milliliter', weatherData.precip_mm),
      precip_in_txt: numberFormat(lang, 'inch', weatherData.precip_in),
      humidity_txt: numberFormat(lang, 'percent', weatherData.humidity),
      pressure_mb_txt: numberFormat(lang, 'millibar', weatherData.pressure_mb),
      pressure_in_txt: numberFormat(lang, 'inch', weatherData.pressure_in)
    }
  } else {
    currentWeatherData = {
      ...weatherData,
      temp_c_txt: numberFormat(lang, 'celsius', weatherData.temp_c),
      temp_f_txt: numberFormat(lang, 'fahrenheit', weatherData.temp_f),
      feelslike_c_txt: numberFormat(lang, 'celsius', weatherData.feelslike_c),
      feelslike_f_txt: numberFormat(lang, 'fahrenheit', weatherData.feelslike_f),
      precip_mm_txt: numberFormat(lang, 'milliliter', weatherData.precip_mm),
      precip_in_txt: numberFormat(lang, 'inch', weatherData.precip_in),
      humidity_txt: numberFormat(lang, 'percent', weatherData.humidity),
      pressure_mb_txt: numberFormat(lang, 'millibar', weatherData.pressure_mb),
      pressure_in_txt: numberFormat(lang, 'inch', weatherData.pressure_in)
    }
  }
  return currentWeatherData
}
