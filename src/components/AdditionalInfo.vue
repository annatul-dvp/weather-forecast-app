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
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';

  %compact-item_bg {
    background-size: contain;
    background-repeat: no-repeat;
    filter: opacity(80%);
  }

  .cities-weather {
    @include display-flex (row, space-between, normal, wrap);
    row-gap: $hb-row-gap-l-size;

    &__compact-item {
      position: relative;
      padding: 10px 20px;
      border-radius: 5px;
      height: calc((100% - $hb-row-gap-l-size) / 2);
      width: 24%;
      // width: 22%;
      background-color: $light-primary-color;
      box-shadow: 2px 2px 5px rgba(0, 0, 0, .4),
                  -2px 2px 5px rgba(0, 0, 0, .4),
                  2px -2px 5px rgba(0, 0, 0, .4);
      color: $primary-color;
      isolation: isolate;
    }
  }

  .forecast-weather {
    @include display-flex (row, space-evenly, normal, wrap);
    border-top: 2px solid;

    &__title {
      margin-bottom: 20px;
      width: 100%;
      font-size: 1.5rem;
      line-height: 1.5rem;
    }
  }

  @media screen and (max-width: 1280px) {
    .cities-weather {
      @include display-flex (row, flex-start, normal, wrap);
      column-gap: 1.25%;
      row-gap: $hb-row-gap-m-size;
        &__compact-item {
          padding: 10px 15px;
          height: calc((100% - $hb-row-gap-m-size*2) / 3);
          width: 32.5%;
        }
    }
  }

  @media screen and (max-width: 960px) {
    .cities-weather {
      column-gap: $hb-column-gap-xl-size;
        &__compact-item {
          height: calc((100% - $hb-row-gap-m-size*3) / 4);
          width: 49%;
        }
    }

    .forecast-weather {
      row-gap: 4px;
      border-top: 2px solid;

      &__title {
        margin-bottom: 5px;
        font-size: 1.3rem;
        line-height: 1.3rem;
      }
    }
  }

  @media screen and (max-width: 620px) {
    .cities-weather {
      row-gap: $hb-row-gap-s-size;
        &__compact-item {
          height: calc((100% - $hb-row-gap-s-size*3) / 4);
        }
    }
  }

  @media screen and (orientation: $orient-portrait) {
    .forecast-weather {
      row-gap: 2%;
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    .cities-weather {
      column-gap: 1%;
        &__compact-item {
          padding: 5px 15px;
          width: 49.5%;
        }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 640px) {
    .cities-weather {
      @include display-flex (row, flex-start, normal, wrap);
      column-gap: 0;
      row-gap: $hb-row-gap-m-size;
        &__compact-item {
          padding: 5px 15px;
          height: calc((100% - $hb-row-gap-m-size*7) / 8);
          width: 100%;
        }
    }

    .forecast-weather {
      row-gap: 15px;

      &__title {
        font-size: 1.5rem;
        line-height: 1.5rem;
      }
    }
  }
</style>
