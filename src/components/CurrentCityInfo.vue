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
      <span class="span-smth-name">Температура:</span>
      <span class="detailed-weather__temp">{{ currentWeatherData.temp_c }} C / {{ currentWeatherData.temp_f }} F</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Ощущается, как:</span>
      <span class="detailed-weather__curr-temp">{{ currentWeatherData.feelslike_c }} C / {{ currentWeatherData.feelslike_f }} F</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Осадки:</span>
      <span class="detailed-weather__precip">{{ currentWeatherData.precip_mm }} миллиметров / {{ currentWeatherData.precip_in }} дюймов</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Влажность:</span>
      <span class="detailed-weather__humidity">{{ currentWeatherData.humidity }}%</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Давление:</span>
      <span class="detailed-weather__pressure">{{ currentWeatherData.pressure_mb }} миллибар / {{ currentWeatherData.pressure_in }} дюймов</span>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
// import useTranslation from '@/hooks/useTranslation'

export default defineComponent({
  setup () {
    const $store = useStore()
    const statuses = computed(() => $store.getters.getDataStatuses)
    // console.log(statuses)
    // const isCityDataLoading = computed(() => !!$store.getters.isUserDataLoading)
    // const isCityDataFailed = computed(() => !!$store.getters.isUserDataFailed)
    const currentCityName = computed(() => $store.getters.currentWeatherData.cityRu)
    const currentWeatherData = computed(() => $store.getters.currentWeatherData)

    return {
      statuses,
      // isCityDataLoading,
      // isCityDataFailed,
      currentCityName,
      currentWeatherData
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
      width: 40%;
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
      width: 60%;
      margin-bottom: 25px;
      font-size: 1.2rem;
    }

    &__picture {

      position: absolute;
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // top: 12%;
      top: 50px;
      left: 6%;
      width: 60x;
      height: 100%;

    }

    &__img {
      z-index: -1;
      width: 100%;
      opacity: .5;
      // transform: translateY(5%);
    }
  }
</style>
