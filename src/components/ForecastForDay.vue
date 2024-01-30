<template>
  <div v-if="statuses.isDataFailed">Ошибка при загрузке данных!</div>
  <div v-else-if="statuses.isDataLoading">Идёт загрузка....</div>
  <div v-else class="weather-for-day" v-for="(day) of forecastWeatherData" :key="day.date">
    <h4 class="weather-for-day__date">2024/01/30</h4>
    <div class="weather-for-day__data astro-data">Восход солнца: {{ day.astro.sunrise }}</div>
    <div class="weather-for-day__data astro-data">Закат солнца: {{ day.astro.sunset }}</div>
    <div class="weather-for-day__data">Средняя температура: {{ day.day.avgtemp_c }} C / {{ day.day.avgtemp_c }} F</div>
    <div class="weather-for-day__data">Макс. температура: {{ day.day.maxtemp_c }} C / {{ day.day.maxtemp_c }} F</div>
    <div class="weather-for-day__data">Мин. температура: {{ day.day.mintemp_c }} C / {{ day.day.mintemp_c }} F</div>
    <div class="weather-for-day__data">Осадки: {{ day.day.totalprecip_mm }} милиметров / {{ day.day.totalprecip_in }} дюймов</div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const $store = useStore()
    const statuses = computed(() => $store.getters.getDataStatuses)
    const forecastWeatherData = computed(() => $store.getters.forecastWeatherData)

    return {
      statuses,
      forecastWeatherData
    }
  }
})
</script>

<style lang="scss">
  $active-color: #6e4241;
  $middle-color: #ef8d50;

  .weather-for-day {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px;
    border: 2px solid;
    border-radius: 10px;
    min-height: 80%;

    &__date {
      text-align: center;
      margin-bottom: 5px;
      font-size: 1.15rem;
    }

    &__data {
      text-align: left;
    }
  }

  .astro-data {
    // text-align: center;
    // font-size: .8rem;
    color: $active-color;
    font-style: italic;
  }
</style>
