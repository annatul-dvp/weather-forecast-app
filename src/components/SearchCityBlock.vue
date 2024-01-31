<!-- Block with form for search certain city weather -->
<template>
  <form action="" class="form">
    <input type="text" list="cities_datalist" class="input"
      v-model.trim="searchedCity" placeholder="Введите город"
      @input="getAssumedCitiesList(searchedCity)">
    <datalist id="cities_datalist" class="datalist">
      <option v-for="city of foundCities" :key="city.id" :value="city.name +', ' + city.country"/>
    </datalist>
    <button type="submit" class="btn btn-submit" @click="getSearchedCityData(searchedCity)">Найти</button>
    <ModalWindow v-model:open="errorTheCityIsntFound">
      Город не найден!
    </ModalWindow>
  </form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL, theKey } from '@/config'
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ModalWindow from '@/components/ModalWindow.vue'
import useCityNameTranslation from '@/hooks/useCityNameTranslation'
// import useTranslation from '@/hooks/useTranslation.js'

export default defineComponent({
  components: {
    ModalWindow
  },
  setup () {
    const errorTheCityIsntFound = ref(false)
    const searchedCity = ref('')
    const searchedCityData = ref()

    const foundCities = ref()

    function getAssumedCitiesList (name) {
      // console.log('Запущена')
      if (name !== '') {
        // const nameEng = useTranslation(name.value, 'auto', 'en')
        // console.log(nameEng)
        foundCities.value = axios.get(`${API_BASE_URL}search.json?key=${theKey}&q=${name}`)
          .then(response => {
            // response.data.forEach((city) => foundCities.value.push(city))
            foundCities.value = response.data
            // console.log(response.data)
            // console.log(foundCities.value)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }

    const $store = useStore()

    async function getSearchedCityData (city) {
      console.log(foundCities.value)
      if (!foundCities.value || foundCities.value.length === 0) {
        console.log('Empty')
        errorTheCityIsntFound.value = true
      } else {
        // console.log('Something')
        await axios.get(`${API_BASE_URL}forecast.json?key=${theKey}&q=${city}&days=3`)
          .then(response => {
            console.log('Найдены данные о городе:')
            console.log(response.data)
            $store.commit('setWeatherData', response.data)
            // commit('setWeatherData', response.data)
          })
          .catch(error => {
            $store.commit('setDataFailed', true)
            console.log(error)
          })
        $store.commit('setCityNameTranslation',
          await useCityNameTranslation(
            $store.state.currentWeatherData.country,
            $store.state.currentWeatherData.region,
            $store.state.currentWeatherData.city
          )
        )
      }
    }

    return {
      errorTheCityIsntFound,
      searchedCity,
      searchedCityData,
      getSearchedCityData,
      getAssumedCitiesList,
      foundCities
    }
  }
})
</script>

<style scoped lang="scss" >
$primary-color: #22475a;
$light-primary-color: #ffffff;
$active-color: #6e4241;
$focused-color: #b96246;
$light-color: #eec583;
$middle-color: #ef8d50;

.form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input {
  height: 100%;
  width: 65%;
  margin-right: 2%;
}

.btn {
  width: 33%;
  background-color: $primary-color;
  color: $light-primary-color;
}

</style>
