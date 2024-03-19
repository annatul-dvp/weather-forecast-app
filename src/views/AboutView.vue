<template>
  <div v-if="lang==='ru'" class="container about">
    <h1 class="about__title">Добро Пожаловать!</h1>
    <p class="about__text">Данный проект является Pet-проектом, созданным Тулупцевой Анной.
      Сайт прогноза погоды создан при помощи JavaScript фреймворка Vue3 с использование библиотек
      Vuex.js и Vue Router. Для стилизации элементов веб-страницы использовался SCSS.
    </p>
    <p class="about__text">
      Для получения данных о текущей погоде и прогноза на данном сайте используется <a href="https://www.weatherapi.com/" class="link">JSON and XML weather API and Geolocation Developer API</a>.
      А для осуществления некоторых переводов с английского на русский и наоборот задействован <a href="https://rapidapi.com/" class="link">Rapid API</a>.
    </p>
  </div>
  <div v-else class="container about">
    <h1 class="about__title">Welcome!</h1>
    <p class="about__text">This is a Pet project created by Anna Tuluptseva.
      The Weather Forecast site was created by using JavaScript framefork Vue3 with libraries
      Vuex.js and Vue Router. SCSS was used to style the visual elements of a webpage.
    </p>
    <p class="about__text">
      <a href="https://www.weatherapi.com/" class="link">JSON and XML weather API and Geolocation Developer API</a>
      is used to get data of current weather data and forecast data.
      As well, <a href="https://rapidapi.com/" class="link">Rapid API</a> is used for some website's translations.
    </p>
  </div>

</template>

<script>
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const $store = useStore()
    const lang = computed(() => $store.getters.getCurrentLang)

    return {
      lang
    }
  }
})
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';

  .link {
    cursor: pointer;
    color: $primary-color;
    text-decoration: none;
    font-weight: bold;
  }

  .about {
    padding-top: 5%;
    height: calc(100vh - $header-height-m-size - $footer-height-m-size);
    height: calc(100svh - $header-height-m-size - $footer-height-m-size);
    // background: red;
    overflow: hidden;

    &__title {
      margin-bottom: 2%;
      font-size: 3rem;
    }

    &__text {
      font-size: 1.2rem;
      line-height: 2;
      text-align: justify;
      text-indent: 5%;
    }
  }

  @media screen and (max-width: 1280px) {
    .about {
      height: calc(100vh - $header-height-s-size - $footer-height-s-size);
      height: calc(100svh - $header-height-s-size - $footer-height-s-size);
    }
  }

  @media screen and (max-width: 960px) {
    .about {
      height: calc(100vh - $header-height-xs-size - $footer-height-s-size);
      height: calc(100svh - $header-height-xs-size - $footer-height-s-size);
    }
  }

  @media screen and (max-width: 620px) {
    .about {
      height: calc(100vh - $header-height-xxs-size - $footer-height-xxs-size);
      height: calc(100svh - $header-height-xxs-size - $footer-height-xxs-size);
    }
  }

  @media screen and (orientation: $orient-portrait) {
    .about {
      height: calc(100vh - $header-height-l-size - $footer-height-l-size);
      height: calc(100svh - $header-height-l-size - $footer-height-l-size);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 1280px) {
    .about {
      height: calc(100vh - $header-height-m-size - $footer-height-m-size);
      height: calc(100svh - $header-height-m-size - $footer-height-m-size);
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    .about {
      padding-top: 10%;
      height: calc(100vh - $header-height-s-size - $footer-height-l-size);
      height: calc(100svh - $header-height-s-size - $footer-height-l-size);

      &__title {
        font-size: 2rem;
      }

      &__text {
        font-size: 1rem;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 640px) {
    .about {
      padding-top: 16%;
    }
  }
</style>
