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
    height: $current-city-height-l-size;
  }

  .additional-info {
    position: relative;
    width: 100%;
    /* window height - current city's height - header height - footer height */
    height: calc(100vh - $current-city-height-l-size - $header-height-m-size - $footer-height-m-size);
    height: calc(100svh - $current-city-height-l-size - $header-height-m-size - $footer-height-m-size);
    overflow: hidden;
  }

  @media screen and (max-width: 1280px) {
    .current-city {
      height: $current-city-height-s-size;
    }

    .additional-info {
      /* window height - current city's height - header height - footer height */
      height: calc(100vh - $current-city-height-s-size - $header-height-s-size - $footer-height-s-size);
      height: calc(100svh - $current-city-height-s-size - $header-height-s-size - $footer-height-s-size);
    }
  }

  @media screen and (max-width: 960px) {
    .current-city {
      height: $current-city-height-xs-size;
    }

    .additional-info {
      /* standart window height for mobile devices */
      height: $additional-info-height-m-size;
    }
  }

  @media screen and (max-width: 620px) {
    .current-city {
      height: $current-city-height-xxs-size;
    }

    .additional-info {
      /* standart window height for mobile devices */
      height: $additional-info-height-s-size;
    }
  }

  @media screen and (orientation: $orient-portrait){
    .current-city {
      min-height: $current-city-height-xxl-size;
      max-height: 60%;
    }

    .additional-info {
      /* window height - current city's height - header height - footer height */
      height: calc(100vh - $current-city-height-xxl-size - $header-height-l-size - $footer-height-l-size);
      height: calc(100svh - $current-city-height-xxl-size - $header-height-l-size - $footer-height-l-size);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 1280px){
    .current-city {
      height: $current-city-height-xl-size;
      min-height: min-content;
      max-height: none;
    }

    .additional-info {
      /* window height - current city's height - header height - footer height */
      height: calc(100vh - $current-city-height-xl-size - $header-height-m-size - $footer-height-m-size);
      height: calc(100svh - $current-city-height-xl-size - $header-height-m-size - $footer-height-m-size);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px){
    .current-city {
      margin-top: calc($header-height-m-size - 12px);
      height: $current-city-height-l-size;
    }

    .additional-info {
      /* window height - current city's height - header height - footer height */
      height: calc(100vh - $current-city-height-l-size - $header-height-m-size * 2 - $footer-height-m-size);
      height: calc(100svh - $current-city-height-l-size - $header-height-m-size * 2 - $footer-height-m-size);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 640px){
    .current-city {
      margin-top: calc($header-height-s-size - 10px);
      height: $current-city-height-m-size;
    }

    .additional-info {
      /* standart window height for mobile devices */
      height: $additional-info-height-l-size;
    }
  }
</style>
