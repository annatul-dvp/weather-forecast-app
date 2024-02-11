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
    // const currentWeatherData = computed(() => {
    //   return {
    //     condition: {
    //       icon: $store.getters.currentWeatherData.condition.icon,
    //       text: $store.getters.currentWeatherData.condition.text
    //     },
    //     temp_c: numberFormat(lang, 'celsius', Number($store.getters.currentWeatherData.temp_c)),
    //     temp_f: numberFormat(lang, 'fahrenheit', Number($store.getters.currentWeatherData.temp_f)),
    //     feelslike_c: numberFormat(lang, 'celsius', Number($store.getters.currentWeatherData.feelslike_c)),
    //     feelslike_f: numberFormat(lang, 'fahrenheit', Number($store.getters.currentWeatherData.feelslike_f)),
    //     precip_mm: numberFormat(lang, 'milliliter', Number($store.getters.currentWeatherData.precip_mm)),
    //     precip_in: numberFormat(lang, 'inch', Number($store.getters.currentWeatherData.precip_in)),
    //     humidity: numberFormat(lang, 'percent', Number($store.getters.currentWeatherData.humidity)),
    //     pressure_mb: numberFormat(lang, 'millibar', Number($store.getters.currentWeatherData.pressure_mb)),
    //     pressure_in: numberFormat(lang, 'inch', Number($store.getters.currentWeatherData.pressure_in))
    //   }
    // })

    // const websiteText = ref()

    // watch(() => lang.value, (lang) => {
    //   console.log('Изменился')
    //   if (lang === 'ru') {
    //     theName.value = props.names.ru
    //     websiteText.value.loadingDataMsg = 'Идёт загрузка данных о погоде...'
    //     websiteText.value.errorLoadingDataMsg = 'Не удалось загрузить данные о погоде'
    //     websiteText.value.tepmTxt = 'Температура: '
    //     websiteText.value.feelslikeTxt = 'Ощущается как: '
    //   } else {
    //     theName.value = props.names.eng
    //     websiteText.value.loadingDataMsg = 'Weather data is loading...'
    //     websiteText.value.errorLoadingDataMsg = 'Failed to load weather data'
    //     websiteText.value.tepmTxt = 'Temperature: '
    //     websiteText.value.feelslikeTxt = 'Feels like: '
    //   }
    // }, { immediate: true })

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
  %flex-column-left-sided {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .detailed-weather {
    position: relative;
    @extend %flex-column-left-sided;
    flex-wrap: wrap;
    justify-content: center;

    &__city-name,
    &__current-time{
      @extend %flex-column-left-sided;
      padding-left: 5%;
      width: 50%;
      height: 50%;
    }

    &__city-name {
      justify-content: end;
      font-size: 4rem;
    }

    &__current-time {
      justify-content: start;
      font-size: 1rem;
      font-style: italic;
    }

    &__info {
      display: flex;
      flex-direction: row;
      width: 50%;
      margin-bottom: 25px;
      font-size: 1.2rem;
    }

    &__picture {
      position: absolute;
      top: 50px;
      left: 6%;
      width: 60x;
      height: 100%;

    }

    &__img {
      z-index: -1;
      width: 100%;
      opacity: .5;
    }
  }
</style>
