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
</template>

<script>
// import Vue from 'vue'
// import VueNumberFormat from '@coders-tm/vue-number-format'

// // register directive v-number and component <number>
// Vue.use(VueNumberFormat, { precision: 4 })

import SearchCityBlock from './components/SearchCityBlock.vue'
import LanguageSwitch from './components/LanguageSwitch.vue'

export default {
  components: {
    SearchCityBlock,
    LanguageSwitch
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

.header {
  display: flex;
  flex-direction: row;

  &__nav {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
    width: 55%;
  }

  &__search {
    width: 35%;
  }

  &__lang-switch {
    width: 10%;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 5px;
  }
}

.nav {
  &__link {
    @extend %link;
    font-size: 1rem;
    font-weight: bold;
    color: $primary-color;

    &.router-link-exact-active {
      color: $active-color;
      text-decoration: underline;
    }
  }
}

.btn {
  padding: 8px;
  border-radius: 6px;
  border: none;
  background: transparent;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1rem;
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

.compact-item {
 padding: 10px;
 border-radius: 5px;
 border-style: solid;
 border-width: 1px;
}
</style>
