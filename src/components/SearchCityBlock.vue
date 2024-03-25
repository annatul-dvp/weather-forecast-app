<!-- Block with form for search certain city weather -->
<template>
  <form action="" class="form search-form">
    <fieldset class="search-form__fieldset">
      <input type="text" list="cities_datalist" class="input search-form__input"
        v-model.trim="searchedCity" :placeholder="websiteText.inputPlaceholder"
        @input="getAssumedCitiesList(searchedCity)" @focus="setDatalistStyleFocused(true)"
        @focusout="setDatalistStyleFocused(false)"    @mouseenter="setDatalistStatus('')">
      <div id="cities_datalist" class="custom-datalist search-form__custom-datalist" :class="[datalistStatus, datalistStyle]"
      @mouseleave="setDatalistStatus('custom-datalist_hidden')">
        <div class="custom-datalist__option" v-for="city of foundCities" :key="city.id"
        :value="city.name +', ' + city.country" @click="toChooseCity(city)">
          {{ city.name +', ' + city.country }}
        </div>
      </div>
      <div id="msg-teleport-target"></div>
    </fieldset>
    <button type="submit" class="btn btn_dark-theme search-form__btn" @click.prevent="getSearchedCityData(searchedCity)">
      <span class="btn__txt"> {{ websiteText.btnSearch }}</span>
    </button>
    <ModalWindow v-model:open="errorTheCityIsntFound.status" v-model:style="errorSearchMessageStyle">
      {{ errorTheCityIsntFound.text }}
    </ModalWindow>
    <ModalMessage v-model:shown="isTypedTextErrorShown" v-model:style="errorSearchMessageStyle">
      {{ isTypedTextErrorShown }}
    </ModalMessage>
  </form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL, theKey } from '@/config'
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useWindowSize } from '@vueuse/core'
import ModalWindow from '@/components/ModalWindow.vue'
import ModalMessage from './ModalMessage.vue'
import isLanguageCorrect from '@/hooks/useLanguageCheck'

export default defineComponent({
  components: {
    ModalWindow,
    ModalMessage
  },
  setup () {
    const $store = useStore()
    const lang = computed(() => $store.getters.getCurrentLang)
    const websiteText = computed(() => $store.getters.getWebsiteText)
    // const windowWidth = ref(window.innerWidth)
    const errorSearchMessageStyle = ref('size-big-screen')

    // getting current screen with using library VueUse
    const { width: screenWidth } = useWindowSize()

    // function to set style for search error message that is showed by ModalMessage.vue
    function setSearchErrorMessageStyle (winWidth) {
      if (winWidth <= 1280) {
        return 'size-small-screen'
      } else {
        return 'size-big-screen'
      }
    }

    // controlling changing window with, it will be needed to show ModalMessage of Error correctly
    onMounted(() => {
      errorSearchMessageStyle.value = setSearchErrorMessageStyle(screenWidth.value)
    })

    // watching if a screen width has changed and if a new width is different comparing to 1280px
    // it's important because we have diffent styles to show modal windows with a error,
    // the styles depend on screen width: <= or > 1280px
    watch(() => screenWidth.value, (newWidth, oldWidth) => {
      if (newWidth <= 1280 & oldWidth > 1280 || newWidth > 1280 & oldWidth <= 1280) {
        errorSearchMessageStyle.value = setSearchErrorMessageStyle(newWidth)
      }
    })

    const errorTheCityIsntFound = ref({ // error info, it will open ModalWindow if the city hasn't been found
      status: false,
      text: ''
    })

    const searchedCity = ref('') // the name of city to be searched, changing with input data
    const isTypedTextErrorShown = ref(false) // shows is there a error in typing text

    function toShowTypedTextError (isShown) {
      isTypedTextErrorShown.value = isShown
    }

    // checking is typing text using correct language
    watch(() => searchedCity.value, (text) => {
      if (lang.value === 'ru' & !isLanguageCorrect(lang.value, text) & text !== '') {
        searchedCity.value = searchedCity.value.substring(0, searchedCity.value.length - 1)
        isTypedTextErrorShown.value = 'Введён некорректный символ! Используйте, пожалуйста, русскую раскладку на клавиатуре.'
        setTimeout(toShowTypedTextError, 4000, false)
      }
      if (lang.value === 'en' & !isLanguageCorrect(lang.value, text) & text !== '') {
        searchedCity.value = searchedCity.value.substring(0, searchedCity.value.length - 1)
        isTypedTextErrorShown.value = 'Incorrect symbol! Use the English keyboard layout, please.'
        setTimeout(toShowTypedTextError, 4000, false)
      }
    })

    const searchedCityData = ref() // data of searched city, it's got after clicking button 'Search'

    // list of found assumed cities
    const foundCities = ref([])

    // getting list of assumed cities that we might be searching
    async function getAssumedCitiesList (name) {
      // searching only if city name is not empty and typed correctly
      if (name !== '' & !isTypedTextErrorShown.value) {
        await axios.get(`${API_BASE_URL}search.json?key=${theKey}&q=${name}`)
          .then(response => {
            foundCities.value = response.data.filter((city) => isLanguageCorrect(lang.value, city.name))
          })
          .catch(error => {
            console.log(error)
          })
        await setDatalistStatus('')
      } else {
        foundCities.value = []
        setDatalistStatus('custom-datalist_hidden')
      }
    }

    // datalist status variable
    const datalistStatus = ref('custom-datalist_hidden')

    // Setting datalist status, does it need to be hidded or showed
    function setDatalistStatus (status) {
      // Checking is there something to show or the list is empty
      if (foundCities.value.length !== 0) {
        datalistStatus.value = status
      } else {
        datalistStatus.value = 'custom-datalist_hidden'
      }
    }

    // datalist styles depends on input is focused or not
    const datalistStyle = ref('custom-datalist_default')

    function setDatalistStyleFocused (isFocused) {
      if (isFocused) {
        datalistStyle.value = 'custom-datalist_focused'
      } else {
        datalistStyle.value = 'custom-datalist_default'
      }
    }

    // Getting full information of chosen city
    function getSearchedCityData (city) {
      if (foundCities.value.length === 0) {
        // if array of cities is empty, that means none city is found
        errorTheCityIsntFound.value.status = true
        if (this.lang === 'ru') {
          errorTheCityIsntFound.value.text = 'Город не найден!'
        } else {
          errorTheCityIsntFound.value.text = 'A city has\'t been found'
        }
      } else {
        axios.get(`${API_BASE_URL}forecast.json?key=${theKey}&q=${city}&days=3`)
          .then(response => {
            $store.commit('setWeatherData', response.data)
          })
          .catch(error => {
            $store.commit('setDataFailed', true)
            console.log(error)
          })
      }
    }

    // Choosing city from dataset of cities
    function toChooseCity (city) {
      searchedCity.value = city.name + ', ' + city.country
      foundCities.value.length = 0
      foundCities.value.push(city)
      setDatalistStatus('custom-datalist_hidden')
      setDatalistStyleFocused(false)
    }

    return {
      lang,
      websiteText,
      errorSearchMessageStyle,

      searchedCity,
      isTypedTextErrorShown,
      toShowTypedTextError,

      toChooseCity,

      getAssumedCitiesList,
      foundCities,
      errorTheCityIsntFound,
      datalistStatus,
      setDatalistStatus,
      datalistStyle,
      setDatalistStyleFocused,

      getSearchedCityData,
      searchedCityData
    }
  }
})
</script>

<style scoped lang="scss" >
@import '@/styles/variables.scss';
@import '@/styles/mixins.scss';

.search-form {
  @include display-flex (row, space-between);

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
  padding-top: 6px;
  width: 100%;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  // border-left: 3px solid $focused-color;
  // border-right: 3px solid $focused-color;
  // border-bottom: 3px solid $focused-color;
  overflow-x: hidden;
  transform: translateY(0px);

  &_default {
    transition: all .2s ease-in-out;
    border-left: 1px solid $primary-color;
    border-right: 1px solid $primary-color;
    border-bottom: 1px solid $primary-color;
  }

  &_focused {
    transition: all .2s ease-in-out;
    border-left: 3px solid $focused-color;
    border-right: 3px solid $focused-color;
    border-bottom: 3px solid $focused-color;
  }

  &__option {
    cursor: pointer;
    padding: 10px;
    width: 100%;
    height: 40px;
    background-color: $light-primary-color;
    white-space: nowrap;
    text-align: left;
    transition: all .5s ease-in-out;

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
  opacity: 0;
  transform: translateY(-6px);
}

</style>
