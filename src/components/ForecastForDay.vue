<template>
  <div v-if="statuses.isDataLoading">{{ websiteText.loadingDataMsg }}</div>
  <div v-else-if="statuses.isDataFailed">{{ websiteText.errorLoadingDataMsg }}</div>
  <div v-else class="weather-for-day" v-for="(day) of forecastWeatherData" :key="day.date">
    <h4 class="weather-for-day__date">2024/01/30</h4>
    <div class="weather-for-day__data astro-data">{{ websiteText.sunriseTxt }}{{ day.astro.sunrise }}</div>
    <div class="weather-for-day__data astro-data">{{ websiteText.sunsetTxt }}{{ day.astro.sunset }}</div>
    <div class="weather-for-day__data">{{ websiteText.avgtempTxt }}{{ day.day.avgtemp_c_txt }} / {{ day.day.avgtemp_f_txt }}</div>
    <div class="weather-for-day__data">{{ websiteText.maxtempTxt }}{{ day.day.maxtemp_c_txt }} / {{ day.day.maxtemp_f_txt }}</div>
    <div class="weather-for-day__data">{{ websiteText.mintempTxt }}{{ day.day.mintemp_c_txt }} / {{ day.day.mintemp_f_txt }}</div>
    <div class="weather-for-day__data">{{ websiteText.precipTxt }}{{ day.day.totalprecip_mm_txt }} / {{ day.day.totalprecip_in_txt }}</div>
    <picture class="weather-for-day__picture">
      <source :srcset=day.day.condition.icon />
      <img class="weather-for-day__img" :src=day.day.condition.icon :alt=day.day.condition.text />
    </picture>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const $store = useStore()
    const websiteText = computed(() => $store.getters.getWebsiteText)
    const statuses = computed(() => $store.getters.getDataStatuses)
    const forecastWeatherData = computed(() => $store.getters.forecastWeatherData)

    return {
      websiteText,

      statuses,
      forecastWeatherData
    }
  }
})
</script>

<style lang="scss">
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';

  .weather-for-day {
    position: relative;
    @include display-flex (column, space-between, self-start);
    padding: 20px;
    border: 2px solid;
    border-radius: 10px;
    min-height: 80%;

    &__date {
      margin-bottom: 5px;
      width: 100%;
      font-size: 1.15rem;
    }

    &__picture {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 25%;
    }

    &__img {
      z-index: -1;
      width: 100%;
      opacity: .5;
    }
  }

  .astro-data {
    color: $active-color;
    font-style: italic;
  }

  @media screen and (max-width: 960px) {
    .weather-for-day {
      position: relative;
      @include display-flex (row, space-between, normal, wrap);
      padding: 5px 10px;
      border: 1px solid;
      min-height: auto;

      &__date {
        font-size: 1rem;
      }

      &__data {
        width: 50%;
        margin-bottom: 5px;
        font-size: .9rem;
      }

      &__picture {
        display: none;
      }
    }

    .astro-data {
      &:nth-of-type(1) {
        padding-right: 15px;
        text-align: right;
      }
      &:nth-of-type(2) {
        padding-left: 15px;
        text-align: left;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) {
    .weather-for-day {
      position: relative;
      @include display-flex (row, space-between, normal, wrap);
      padding: 25px 50px;
      min-height: 27%;
      width: 100%;

      &__date {
        font-size: 1.3rem;
      }

      &__data {
        width: 50%;
        margin-bottom: 5px;
      }

      &__picture {
        top: 25px;
        right: 42%;
        width: auto;
        transform: scale(80%) translateX(100%) translateY(-25%);
      }
    }

    .astro-data {
      &:nth-of-type(1) {
        padding-right: 15px;
        text-align: right;
      }
      &:nth-of-type(2) {
        padding-left: 15px;
        text-align: left;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 1280px) {
    .weather-for-day {
      padding: 25px 30px 10px 30px;

      &__picture {
        right: 40%;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    .weather-for-day {
      padding: 20px 15px 10px 15px;
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 620px) {
    .weather-for-day {
      padding: 15px 10px 5px 10px;

      &__data:not(.astro-data) {
        width: 100%;
      }
    }
  }
</style>
