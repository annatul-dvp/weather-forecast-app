<template>
  <div>
    <!--The up block shows current/chosen city weather info-->
    <!--The down block shows list of cities with short weather info-->
    <CurrentCity class="light-theme"/>
    <div class="container block-info dark-theme">
      <CityCompactItem class="compact-item block-info__compact-item"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { useStore } from 'vuex'
import CityCompactItem from '@/components/CityCompactItem.vue'
import CurrentCity from '@/components/CurrentCity.vue'

export default {
  name: 'HomeView',
  components: {
    CurrentCity,
    CityCompactItem
  },
  setup () {
    const $store = useStore()
    $store.dispatch('getRealtimeWeather')
    const weatherData = $store.state.realtimeWeather

    $store.dispatch('findTheCity')
    const cityInfo = $store.state.findTheCity

    return {
      weatherData,
      cityInfo
    }
  }
}
</script>

<style lang="scss">
  $primary-color: #22475a;
  $light-primary-color: #ffffff;
  $active-color: #6e4241;
  $focused-color: #b96246;
  $light-color: #eec583;
  $middle-color: #ef8d50;

  .light-theme {
    background-color: $light-primary-color;
  }

  .dark-theme {
    background-color: $primary-color;
    color: $light-primary-color;
  }

  .block-info__compact-item {
    border-color: #ffffff;
    color: #ffffff;
  }
</style>
