import citiesDataBase from '@/data/citiesDataBase.js'
import { ref } from 'vue'

// region === subcountry, the difference is its names in Weather API and database with translations
export default function (country, subcountry, city) {
  const nameTranslation = ref({
    country: country,
    region: subcountry,
    city: city
  })
  // console.log(name)
  // console.log(nameTranslation)

  for (const n of citiesDataBase) {
    // console.log(n)
    if (n.name === city & n.country === country & n.subcountry === subcountry) {
      // console.log(n)
      nameTranslation.value.country = n.countryRU
      nameTranslation.value.region = n.subcountryRU
      nameTranslation.value.city = n.nameRU
    }
  }
  // console.log(nameTranslation.value)
  return {
    nameTranslation: nameTranslation.value
  }
}
