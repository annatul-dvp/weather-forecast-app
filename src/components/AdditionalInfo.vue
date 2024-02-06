<template>
  <div>
    <BottomHiddingBlock class="container forecast-weather"
      v-model:open="isBottomHiddingBlockOpen.forecastWeather" v-model:isChanged="isBottomHiddingBlockOpen.isChanged"
      v-model:theme="themes.forecastWeather">
      <h3 class="forecast-weather__title">{{ websiteText.forecastTitleTxt }}</h3>
      <ForecastForDay/>
    </BottomHiddingBlock>
    <BottomHiddingBlock class="container cities-weather"
      v-model:open="isBottomHiddingBlockOpen.citiesWeather" v-model:isChanged="isBottomHiddingBlockOpen.isChanged"
      v-model:theme="themes.citiesWeather">
      <CompactCity v-for="(city) in defaultCities" :key="city.id"
        :names="{eng: city.nameEng, ru: city.nameRu}" :websiteTextt="websiteText"
        class="cities-weather__compact-item"/>
    </BottomHiddingBlock>
  </div>
</template>

<script>
import { defineComponent, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import BottomHiddingBlock from '@/components/BottomHiddingBlock.vue'
import CompactCity from '@/components/CompactCity.vue'
import defaultCitiesList from '@/data/defaultCitiesList.js'
import ForecastForDay from '@/components/ForecastForDay.vue'

export default defineComponent({
  components: {
    BottomHiddingBlock,
    CompactCity,
    ForecastForDay
  },
  setup () {
    const $store = useStore()
    const lang = computed(() => $store.getters.getCurrentLang)
    const websiteText = computed(() => $store.getters.getWebsiteText)

    // default list of cities that shows on the main page
    const defaultCities = defaultCitiesList
    const isBottomHiddingBlockOpen = ref({
      isChanged: false,
      citiesWeather: true,
      forecastWeather: false
    })
    const themes = {
      citiesWeather: 'dark-theme',
      forecastWeather: 'light-theme'
    }

    watch(() => isBottomHiddingBlockOpen.value.citiesWeather, () => {
      if (isBottomHiddingBlockOpen.value.isChanged) {
        isBottomHiddingBlockOpen.value.forecastWeather = !isBottomHiddingBlockOpen.value.forecastWeather
        isBottomHiddingBlockOpen.value.isChanged = false
      }
    })
    watch(() => isBottomHiddingBlockOpen.value.forecastWeather, () => {
      if (isBottomHiddingBlockOpen.value.isChanged) {
        isBottomHiddingBlockOpen.value.citiesWeather = !isBottomHiddingBlockOpen.value.citiesWeather
        isBottomHiddingBlockOpen.value.isChanged = false
      }
    })

    return {
      lang,
      websiteText,

      defaultCities,
      isBottomHiddingBlockOpen,
      themes
    }
  }
})
</script>

<style lang="scss">
  $primary-color: #22475a;
  $light-primary-color: #ffffff;
  $active-color: #6e4241;
  $focused-color: #b96246;
  $light-color: #eec583;
  $middle-color: #ef8d50;
  $current-city-height: 350px;

  %compact-item_bg {
    background-size: contain;
    background-repeat: no-repeat;
    filter: opacity(80%);
  }

  .cities-weather {
    &__compact-item:not(:nth-child(4n  + 1)) {
      margin-right: 4%;
    }

    &__compact-item {
      position: relative;
      padding: 10px 20px;
      border-radius: 5px;
      width: 22%;
      background-color: $light-primary-color;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, .4),
                  -2px 2px 5px rgba(0, 0, 0, .4),
                  2px -2px 5px rgba(0, 0, 0, .4);
      color: $primary-color;
      isolation: isolate;
    }
  }

  .forecast-weather {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border-top: 2px solid;

    &__title {
      margin-bottom: 20px;
      width: 100%;
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }
</style>
