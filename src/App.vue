<template>
  <div class="container header">
    <nav class="nav header__nav">
      <router-link class="nav__link" to="/">{{ websiteText.mainLinkTxt }}</router-link>
      <router-link class="nav__link" to="/about">{{ websiteText.linkAboutTxt }}</router-link>
    </nav>
    <SearchCityBlock class="header__search"/>
    <LanguageSwitch class="header__lang-switch"/>
  </div>
  <router-view/>
  <footer class="footer">
    <a href="https://www.weatherapi.com/" title="Free Weather API" class="footer__link">
      <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0" class="footer__img">
    </a>
    <div class="footer__text">{{ websiteText.footerTxt }}</div>
  </footer>
  <div id="teleport-target"></div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import SearchCityBlock from '@/components/SearchCityBlock.vue'
import LanguageSwitch from '@/components/LanguageSwitch.vue'

export default {
  components: {
    SearchCityBlock,
    LanguageSwitch
  },
  setup () {
    const $store = useStore()
    $store.dispatch('getDefaultData')
    const websiteText = computed(() => $store.getters.getWebsiteText)

    return {
      websiteText
    }
  }
}

</script>

<style lang="scss">
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';

  * {
    cursor: default;
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
    @include display-flex (row, space-between);
    height: $header-height-m-size;

    &__nav {
      @include display-flex (row, left, center);
      width: 50%;
    }

    &__search {
      width: 35%;
    }

    &__lang-switch {
      margin-left: 10px;
      width: calc(15% - 10px);
      border-radius: 5px;
    }
  }

  .nav {
    &__link {
      @include text-to-choose($primary-color);
      @extend %link;
      margin-right: 5%;
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
    }
  }

  .btn_dark-theme {
    background-color: $primary-color;
    color: $light-primary-color;
  }

  .input {
    cursor: pointer;
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
    @include display-flex (row, center, center);
    padding-top: 10px;
    padding-bottom: 10px;
    height: $footer-height-s-size;

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

  @media screen and (max-width: 1280px) {
    html {
      font-size: 16px;
    }

    .header {
      height: $header-height-s-size;

      &__nav {
        width: 25%;
      }

      &__search {
        width: 50%;
      }

      &__lang-switch {
        width: calc(25% - 10px);
      }
    }

    .nav {
      &__link {
        margin-right: 15%;
      }
    }

    .container {
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 2%;
      padding-right: 2%;
    }

    .footer {
      height: $footer-height-s-size;
    }
  }

  @media screen and (max-width: 960px) {
    html {
      font-size: 14px;
    }

    .btn {
      &__txt {
        &::after{
          display: none;
        }
      }
    }

    .container {
      padding-top: 5px;
      padding-bottom: 5px;
    }

    .header {
      height: $header-height-xs-size;

      &__nav {
        width: 25%;
      }

      &__search {
        width: 50%;
      }

      &__lang-switch {
        width: calc(25% - 10px);
      }
    }

    .nav {
      &__link {
        margin-right: 10%;
      }
    }

    .footer {
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

  @media screen and (max-width: 620px) {
    html {
      font-size: 10px;
    }

    .btn {
      padding: 4px;
    }

    .header {
      position: relative;
      height: $header-height-xxs-size;
    }

    .footer {
      padding-top: 5px;
      padding-bottom: 5px;
      height: $footer-height-xxs-size;
    }
  }

  @media screen and (orientation: $orient-portrait) {
    html {
      font-size: 24px;
    }

    .header {
      height: $header-height-l-size;
    }

    .footer {
      height: $footer-height-l-size;
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 1280px) {
    html {
      font-size: 20px;
    }

    .header {
      height: $header-height-m-size;
    }

    .footer {
      height: $footer-height-m-size;
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    .container {
      padding-top: 12px;
      padding-bottom: 12px;
    }

    .header {
      position: relative;
      height: $header-height-m-size;

      &__nav {
        width: 60%;
      }

      &__search {
        position: absolute;
        top: 100%;
        width: 96%;
        height: calc(100% - 24px);
      }

      &__lang-switch {
        width: calc(40% - 10px);
      }
    }

    .footer {
      height: $footer-height-m-size;
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    html {
      font-size: 15px;
    }

    .container {
      padding: 10px 4% 10px 3%;
    }

    .header {
      height: $header-height-s-size;

      &__search {
        height: calc(100% - 20px);
        width: 93%;
      }
    }

    .footer {
      @include display-flex (column, center, center);
      height: $footer-height-l-size;

      &__text {
        margin-left: 0;
      }

      &__link {
        height: 40%;
        margin-bottom: 10px;
      }
    }
  }
</style>
