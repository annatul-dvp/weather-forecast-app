<template>
  <div v-if="statuses.isDataFailed" class="container detailed-weather">Ошибка при загрузке данных! </div>
  <div v-else-if="statuses.isDataLoading" class="container detailed-weather">Идёт загрузка.... </div>
  <div v-else class="container detailed-weather">
    <div class="detailed-weather__city-name">
      {{ currentCityName }}
    </div>
    <div class="detailed-weather__current-time">{{ currentWeatherData.last_updated }}</div>
    <picture class="detailed-weather__picture">
      <source :srcset=currentWeatherData.condition.icon />
      <img class="detailed-weather__img" :src=currentWeatherData.condition.icon :alt=currentWeatherData.condition.text />
    </picture>
    <div class="detailed-weather__info">
      <span class="span-smth-name">{{ websiteText.tempTxt }}</span>
      <span class="detailed-weather__temp">{{ currentWeatherData.temp_c_txt }} / {{ currentWeatherData.temp_f_txt }}</span>
    </div>
    <div class="detailed-weather__info">
    <span class="span-smth-name">{{ websiteText.feelslikeTxt }}</span>
      <span class="detailed-weather__curr-temp">{{ currentWeatherData.feelslike_c_txt }} / {{ currentWeatherData.feelslike_f_txt }}</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">{{ websiteText.precipTxt }}</span>
      <span class="detailed-weather__precip">{{ currentWeatherData.precip_mm_txt }} / {{ currentWeatherData.precip_in_txt }} </span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">{{ websiteText.humidityTxt }}</span>
      <span class="detailed-weather__humidity">{{ currentWeatherData.humidity_txt }}</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">{{ websiteText.pressureTxt }}</span>
      <span class="detailed-weather__pressure">{{ currentWeatherData.pressure_mb_txt }} / {{ currentWeatherData.pressure_in_txt }} </span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
// import numberFormat from '@/helpers/NumberFormat.js'
// import useTranslation from '@/hooks/useTranslation'

export default defineComponent({
  setup () {
    const $store = useStore()
    const lang = computed(() => $store.getters.getCurrentLang)
    const websiteText = computed(() => $store.getters.getWebsiteText)
    const statuses = computed(() => $store.getters.getDataStatuses)
    const currentCityName = computed(() => $store.getters.currentWeatherData.city)
    const currentWeatherData = computed(() => $store.getters.currentWeatherData)

    return {
      lang,
      websiteText,

      statuses,
      currentCityName,
      currentWeatherData
      // temp_c: numberFormat(lang, 'celcus', Number(currentWeatherData.value.temp_c))
    }
  }
})
</script>

<style lang="scss">
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';

  .detailed-weather {
    position: relative;
    @include display-flex (column, center, flex-start, wrap);

    &__city-name,
    &__current-time{
      padding-left: 5%;
      width: 50%;
      height: 50%;
    }

    &__city-name {
      @include display-flex (column, end, flex-start);
      font-size: 4rem;
    }

    &__current-time {
      @include display-flex (column, start, flex-start);
      font-size: 1rem;
      font-style: italic;
    }

    &__info {
      @include display-flex (row, left);
      width: 50%;
      margin-bottom: 25px;
      font-size: 1.2rem;
    }

    &__picture {
      position: absolute;
      top: 50px;
      left: 6%;
      width: 60px;
      height: 100%;
    }

    &__img {
      z-index: -1;
      width: 100%;
      opacity: .5;
    }
  }

  @media screen and (orientation: $orient-portrait){
    .detailed-weather {
      @include display-flex (row, space-between, normal, wrap);

      &__city-name,
      &__current-time{
        padding-left: 0;
        width: 100%;
      }

      &__city-name {
        @include display-flex (column, end, center);
        border-top: 2px solid $primary-color;
        height: 20%;
      }

      &__current-time {
        @include display-flex (column, start, center);
        border-bottom: 2px solid $primary-color;
        height: 15%;
      }

      &__info {
        @include display-flex (row, center);
        width: 100%;
        margin-bottom: 10px;

        &:nth-of-type(3) {
          margin-top: 10px;
        }
      }

      &__picture {
        position: relative;
        top: 0;
        left: 50%;
        height: 5%;
        transform: translateX(-50%) translateY(-250%);
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 900px){
    .detailed-weather {
      &__city-name {
        height: 22%;
      }

      &__current-time {
        height: 18%;
      }

      &__info {
        margin-bottom: 5px;

        &:nth-of-type(3) {
          margin-top: 5px;
        }
      }

      &__picture {
        transform: translateX(-50%) translateY(-320%);
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 700px){
    .detailed-weather {
      &__city-name {
        font-size: 3.5rem;
        border-top: none;
      }

      &__current-time {
        border-bottom: none;
      }

      &__picture {
        transform: translateX(-50%) translateY(-250%);
      }
    }
  }
</style>
