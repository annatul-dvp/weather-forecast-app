<template>
  <div>
    <!--The up block shows current/chosen city weather info-->
    <CurrentCityInfo class="light-theme current-city"/>

    <!--The down block shows list of cities with short weather info-->
    <AdditionalInfo class="additional-info"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import AdditionalInfo from '@/components/AdditionalInfo.vue'
import CurrentCityInfo from '@/components/CurrentCityInfo.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    CurrentCityInfo,
    AdditionalInfo
  },
  setup () {

  }
})
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

  .current-city {
    height: $current-city-height;
  }

  .additional-info {
    position: relative;
    width: 100%;
    /* window height - current cyty's height - header height - footer height */
    height: calc(100vh - $current-city-height - 127px);
    overflow: hidden;
  }

</style>
