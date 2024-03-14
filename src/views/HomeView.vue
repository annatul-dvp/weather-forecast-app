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
  @import '@/styles/variables.scss';

  .current-city {
    height: $current-city-height;
  }

  .additional-info {
    position: relative;
    width: 100%;
    /* window height - current cyty's height - header height - footer height */
    height: calc(100vh - $current-city-height - $header-height - $footer-height);
    overflow: hidden;
  }

  @media screen and (orientation: $orient-portrait){
    .current-city {
      height: $current-city-big-height;
    }

    .additional-info {
      /* window height - current cyty's height - header height - footer height */
      height: calc(100vh - $current-city-big-height - $header-big-height - $footer-big-height);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 900px){
    .current-city {
      height: $current-city-middle-height;
    }

    .additional-info {
      /* window height - current cyty's height - header height - footer height */
      height: calc(100vh - $current-city-middle-height - $header-middle-height - $footer-middle-height);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 700px){
    .current-city {
      height: $current-city-v-height;
    }

    .additional-info {
      /* window height - current cyty's height - header height - footer height */
      height: calc(100vh - $current-city-v-height - $header-height - $footer-height);
    }
  }

</style>
