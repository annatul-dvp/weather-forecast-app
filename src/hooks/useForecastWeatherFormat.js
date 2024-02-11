import numberFormat from '@/helpers/NumberFormat.js'

export default function undateForecastWeatherData (lang, listOfDays) {
  const nextDaysWeather = []
  console.log(listOfDays)
  for (const dayWeather of listOfDays) {
    console.log(dayWeather)
    nextDaysWeather.push({
      ...dayWeather,
      astro: {
        ...dayWeather.astro,
        sunrise: numberFormat(lang, 'time', dayWeather.astro.sunrise),
        sunset: numberFormat(lang, 'time', dayWeather.astro.sunset)
      },
      day: {
        ...dayWeather.day,
        avgtemp_c_txt: numberFormat(lang, 'celsius', dayWeather.day.avgtemp_c),
        avgtemp_f_txt: numberFormat(lang, 'celsius', dayWeather.day.avgtemp_f),
        maxtemp_c_txt: numberFormat(lang, 'celsius', dayWeather.day.maxtemp_c),
        maxtemp_f_txt: numberFormat(lang, 'celsius', dayWeather.day.maxtemp_f),
        mintemp_c_txt: numberFormat(lang, 'celsius', dayWeather.day.mintemp_c),
        mintemp_f_txt: numberFormat(lang, 'celsius', dayWeather.day.mintemp_f),
        totalprecip_mm_txt: numberFormat(lang, 'milliliter', dayWeather.day.totalprecip_mm),
        totalprecip_in_txt: numberFormat(lang, 'inch', dayWeather.day.totalprecip_in)
      }
    })
  }
  return nextDaysWeather
}
