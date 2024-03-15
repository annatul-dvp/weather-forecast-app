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
    height: $current-city-height-m-size;
  }

  .additional-info {
    position: relative;
    width: 100%;
    /* window height - current cyty's height - header height - footer height */
    height: calc(100vh - $current-city-height-m-size - $header-height-m-size - $footer-height-m-size);
    overflow: hidden;
  }

  @media screen and (max-width: 1280px) {
    .current-city {
      height: $current-city-height-s-size;
    }

    .additional-info {
      /* window height - current cyty's height - header height - footer height */
      height: calc(100vh - $current-city-height-s-size - $header-height-s-size - $footer-height-s-size);
    }
  }

  @media screen and (max-width: 960px) {
    .current-city {
      height: $current-city-height-xs-size;
    }

    .additional-info {
      /* window height - current cyty's height - header height - footer height */
      height: $additional-info-height-m-size;
    }
  }

  @media screen and (max-width: 620px) {
    .current-city {
      // margin-top: calc($header-height-xxs-size - 10px);
      height: $current-city-height-xxs-size;
    }

    .additional-info {
      /* window height - current cyty's height - header height - footer height */
      height: $additional-info-height-s-size;
    }
  }

  // @media screen and (orientation: $orient-portrait){
  //   .current-city {
  //     height: $current-city-height-xl-size;
  //   }

  //   .additional-info {
  //     /* window height - current cyty's height - header height - footer height */
  //     height: calc(100vh - $current-city-height-xl-size - $header-big-height - $footer-big-height);
  //   }
  // }

  // @media screen and (orientation: $orient-portrait) and (max-width: 900px){
  //   .current-city {
  //     height: $current-city-middle-height;
  //   }

  //   .additional-info {
  //     /* window height - current cyty's height - header height - footer height */
  //     height: calc(100vh - $current-city-middle-height - $header-middle-height - $footer-middle-height);
  //   }
  // }

  // @media screen and (orientation: $orient-portrait) and (max-width: 700px){
  //   .current-city {
  //     height: $current-city-v-height;
  //   }

  //   .additional-info {
  //     /* window height - current cyty's height - header height - footer height */
  //     height: calc(100vh - $current-city-v-height - $header-height - $footer-height);
  //   }
  // }

</style>
