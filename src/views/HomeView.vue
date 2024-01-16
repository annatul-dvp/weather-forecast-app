<template>
  <div>
    <!--The up block shows current/chosen city weather info-->
    <CurrentCity class="light-theme current-city"/>

    <!--The down block shows list of cities with short weather info-->
    <div class="container cities-weather dark-theme">
      <button class="cities-weather__btn close-block-btn"></button>
      <CompactCity v-for="(city) in cities" :key="city.id" :names="{eng: city.nameEng, ru: city.nameRu}" class="cities-weather__compact-item"/>
      <!-- <CompactCity class="cities-weather__compact-item sunny-weather-bg"/>
      <CompactCity class="cities-weather__compact-item rainy-weather-bg"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/>
      <CompactCity class="cities-weather__compact-item"/> -->
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
// import { useStore } from 'vuex'

import CurrentCity from '@/components/CurrentCity.vue'
import CompactCity from '@/components/CompactCity.vue'
import standartCitiesList from '@/data/standartCitiesList.js'

export default {
  name: 'HomeView',
  components: {
    CurrentCity,
    CompactCity
  },
  setup () {
    // const $store = useStore()

    // $store.dispatch('getUserIPData')
    // $store.dispatch('getRealtimeWeather')
    // const weatherData = $store.state.realtimeWeather

    // $store.dispatch('findTheCity')
    // const cityInfo = $store.state.findTheCity

    const cities = standartCitiesList
    console.log(cities)

    return {
      cities
      // weatherData,
      // cityInfo
    }
  }
}
</script>

<style lang="scss">
  // @use "sass:math";

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

  .light-theme {
    background-color: $light-primary-color;
  }

  .dark-theme {
    background-color: $primary-color;
    color: $light-primary-color;
  }

  .current-city {
    height: $current-city-height;
  }

  .cities-weather {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    row-gap: 20px;
    padding-top: 50px;
    /* window height - current cyty's height - header height - footer height */
    min-height: calc(100vh - $current-city-height - 77px - 40px);

    &__btn {
      position:absolute;
      top: 5px;
      left: calc(50% - 14px);
      right: calc(50% - 14px);
      bottom: calc(100% - 5px - 20px);
      background-color: transparent;
      border: none;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 4px;
        right: 4px;
        bottom: 0;
        border-left: 2px solid $light-primary-color;
        border-bottom: 2px solid $light-primary-color;
        transform-origin: left bottom;
        transform: rotate(-45deg) translateX(8px) translateY(6px);
      }
    }

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

  .cloud-weather-bg::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 23%;
    right: 10px;
    bottom: 0;
    width: 40%;
    background-image: url(../assets/sun-clouds-remix.svg);
    @extend %compact-item_bg;
  }

  .sunny-weather-bg::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 12%;
    right: 10px;
    bottom: 0;
    width: 40%;
    background-image: url(../assets/egonpin-Sol-1.svg);
    @extend %compact-item_bg;
  }

  .rainy-weather-bg::after {
    content: '';
    z-index: -1;
    position: absolute;
    top: 30%;
    right: 10px;
    bottom: 0;
    width: 35%;
    background-image: url(../assets/spite_overcloud_rainfall_1.svg);
    @extend %compact-item_bg;
  }
</style>
