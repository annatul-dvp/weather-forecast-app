<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  <div class="container header">
    <nav class="nav header__nav">
      <router-link class="nav__link" to="/">Главная</router-link>
      <router-link class="nav__link" to="/about">О сайте</router-link>
    </nav>
    <SearchCityBlock class="header__search"/>
    <LanguageSwitch class="header__lang-switch"/>
  </div>
  <router-view/>
  <footer class="footer">
    <a href="https://www.weatherapi.com/" title="Free Weather API" class="footer__link">
      <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0" class="footer__img">
    </a>
    <div class="footer__text">Pet-проект. Создан Анной Тулупцевой. 2024 г.</div>
  </footer>
  <div id="teleport-target"></div>
</template>

<script>
// import Vue from 'vue'
// import VueNumberFormat from '@coders-tm/vue-number-format'

// // register directive v-number and component <number>
// Vue.use(VueNumberFormat, { precision: 4 })
import { useStore } from 'vuex'
import SearchCityBlock from './components/SearchCityBlock.vue'
import LanguageSwitch from './components/LanguageSwitch.vue'

export default {
  components: {
    SearchCityBlock,
    LanguageSwitch
  },
  setup () {
    const $store = useStore()
    $store.dispatch('getDefaultData')
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

  $header-height: 80px;
  $footer-height: 50px;

  @mixin text-to-choose ($border-color) {
    position: relative;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 2px;
        border-bottom: 2px solid $border-color;
        opacity: 0;
        transition: all .5s ease-in-out;
      }
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    &:focus-visible {
      outline: none;
    }
  }

  html {
      font-size: 18px;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $primary-color;
  }

  %link {
    text-decoration: none;
    margin-right: 5%;
  }

  .light-theme {
    background-color: $light-primary-color;
    color: $primary-color;
    border-color: $primary-color;

    .close-block-btn::before {
      border-color: $primary-color;
    }
  }

  .dark-theme {
    background-color: $primary-color;
    color: $light-primary-color;

    .close-block-btn::before {
      border-color: $light-primary-color;
    }
  }

  .header {
    display: flex;
    flex-direction: row;
    height: $header-height;

    &__nav {
      display: flex;
      flex-direction: row;
      justify-content: left;
      align-items: center;
      width: 50%;
    }

    &__search {
      width: 35%;
    }

    &__lang-switch {
      width: 15%;
      padding-left: 10px;
      padding-right: 10px;
      border-radius: 5px;
    }
  }

  .nav {
    &__link {
      @include text-to-choose($primary-color);
      @extend %link;
      font-size: 1rem;
      font-weight: bold;
      color: $primary-color;

      &.router-link-exact-active {
        @include text-to-choose($active-color);
        color: $active-color;
        &:after {
          opacity: 1;
        }
      }

      &:hover {
          &:after {
            opacity: 1;
          }
      }
    }
  }

  .btn {
    cursor: pointer;
    padding: 8px;
    border-radius: 6px;
    border: none;
    background: transparent;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: .95rem;
    transform-origin: center;
    transition: all .5s ease-in-out;

    &:hover {
      .btn__txt {
        &::after {
          opacity: 1;
        }
      }
    }

    &:active {
      background-color: $active-color;
      color: $light-primary-color;

      .btn__txt {
        &::after {
          opacity: 0;
        }
      }
    }

    &__txt {
      @include text-to-choose($light-primary-color);
      // position: relative;

      // &::after {
      //   content: '';
      //   position: absolute;
      //   left: 0;
      //   bottom: -2px;
      //   width: 100%;
      //   height: 2px;
      //   border-bottom: 2px solid $light-primary-color;
      //   opacity: 0;
      //   transition: all .5s ease-in-out;
      // }
    }

  }

  .btn_dark-theme {
    background-color: $primary-color;
    color: $light-primary-color;
  }

  .input {
    padding: 2px;
    border-radius: 6px;
    border: 1px solid $primary-color;
    font-size: 1rem;

    &:focus-visible,
    &:active {
      border-width: 3px;
      border-color: $focused-color;
    }
  }

  .h4 {
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .container {
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 5%;
    padding-right: 5%;
  }

  .span-smth-name {
    margin-right: 15px;
  }

  .footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    height: $footer-height;

    &__text {
      margin-left: 25px;
      font-size: .9rem;
    }

    &__link{
      margin-right: 25px;
      height: 100%;
    }

    &__img {
      height: 100%;
    }
  }

</style>
