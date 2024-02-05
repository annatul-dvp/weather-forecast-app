<!-- Block with form for search certain city weather -->
<template>
  <form action="" class="form search-form">
    <fieldset class="search-form__fieldset">
      <input type="text" list="cities_datalist" class="input search-form__input"
        v-model.trim="searchedCity" placeholder="Введите город"
        @input="getAssumedCitiesList(searchedCity)"
        @mouseenter="setDatalistStatus('')" @mouseleave="setDatalistStatus('custom-datalist_hidden')">
      <div id="cities_datalist" class="custom-datalist search-form__custom-datalist" :class="datalistStatus">
        <div class="custom-datalist__option" v-for="city of foundCities" :key="city.id"
        :value="city.name +', ' + city.country" @click="toChooseCity(city)">
          {{ city.name +', ' + city.country }}
        </div>
      </div>
    </fieldset>
    <button type="submit" class="btn search-form__btn" @click.prevent="getSearchedCityData(searchedCity)">Найти</button>
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
// import useCityNameTranslation from '@/hooks/useCityNameTranslation'
// import useTranslation from '@/hooks/useTranslation.js'

export default defineComponent({
  components: {
    ModalWindow
  },
  setup () {
    const errorTheCityIsntFound = ref(false) // error info, it will open ModalWindow if the city hasn't been found
    const searchedCity = ref('') // the name of city to be searched, changing with input data
    const searchedCityData = ref() // data of searched city, it's got after clicking button 'Search'

    // list of found assumed cities
    const foundCities = ref([])

    // getting list of assumed cities that we might be searching
    async function getAssumedCitiesList (name) {
      if (name !== '') {
        await axios.get(`${API_BASE_URL}search.json?key=${theKey}&q=${name}`)
          .then(response => {
            foundCities.value = response.data
          })
          .catch(error => {
            console.log(error)
          })
        await setDatalistStatus('')
      } else {
        setDatalistStatus('custom-datalist_hidden')
      }
    }

    // datalist status variable
    const datalistStatus = ref('custom-datalist_hidden')

    // Settin datalist status, does it need to be hidded or showed
    function setDatalistStatus (status) {
      // Checking is there something to show or the list is empty
      if (foundCities.value.length !== 0) {
        datalistStatus.value = status
      } else {
        datalistStatus.value = 'custom-datalist_hidden'
      }
    }

    const $store = useStore()

    // Getting full information of chosen city
    function getSearchedCityData (city) {
      if (foundCities.value.length === 0) {
        // if array of cities is empty, that means none city is found
        errorTheCityIsntFound.value = true
      } else {
        axios.get(`${API_BASE_URL}forecast.json?key=${theKey}&q=${city}&days=3`)
          .then(response => {
            $store.commit('setWeatherData', response.data)
          })
          .catch(error => {
            $store.commit('setDataFailed', true)
            console.log(error)
          })
        // $store.commit('setCityNameTranslation',
        //   await useCityNameTranslation(
        //     $store.state.currentWeatherData.country,
        //     $store.state.currentWeatherData.region,
        //     $store.state.currentWeatherData.city
        //   )
        // )
      }
    }

    // Choosing city from dataset of cities
    function toChooseCity (city) {
      searchedCity.value = city.name + ', ' + city.country
      foundCities.value.length = 0
      foundCities.value.push(city)
    }

    return {
      errorTheCityIsntFound,
      searchedCity,
      getAssumedCitiesList,
      foundCities,
      datalistStatus,
      setDatalistStatus,
      toChooseCity,

      getSearchedCityData,
      searchedCityData
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

.search-form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__fieldset {
    position: relative;
    height: 100%;
    width: 65%;
    margin-right: 2%;
    border: none;
  }

  &__input {
    height: 100%;
    width: 100%;
  }

  &__btn {
    width: 33%;
  }
}

.custom-datalist {
  z-index: 1;
  position: absolute;
  top: calc(100% - 6px + 1px);
  left: 0;
  display: block;
  // display: flex;
  // flex-direction: column;
  // align-items: flex-start;
  padding-top: 6px;
  width: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-left: 1px solid $primary-color;
  border-right: 1px solid $primary-color;
  border-bottom: 1px solid $primary-color;
  // border: 1px solid $primary-color;
  overflow-x: hidden;

  &__option {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    height: 40px;
    background-color: $light-primary-color;
    white-space: nowrap;
    text-align: left;

    &:hover {
      background-color: $light-color;
    }

    &:active {
      background-color: $active-color;
      color: $light-primary-color;
    }
  }
}

.custom-datalist_hidden {
  display: none;
}
.btn {
  background-color: $primary-color;
  color: $light-primary-color;
}

</style>
