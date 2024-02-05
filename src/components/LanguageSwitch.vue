<template>
<div>
  <label class="lang" :class="langStatus.en">
    <input type="checkbox" class="input lang__checkbox lang__checkbox_eng" @click="setLanguage('en')">
    <span class="lang__custom-checkbox lang__custom-checkbox_left">
    </span>
    English
  </label>
  <label class="lang" :class="langStatus.ru">
    <input type="checkbox" class="input lang__checkbox lang__checkbox_ru" @click="setLanguage('ru')">
    <span class="lang__custom-checkbox lang__custom-checkbox_right"></span>
    Русский
  </label>
</div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const $store = useStore()

    const langStatus = ref({
      en: '',
      ru: ''
    })

    function setStatus () {
      if ($store.state.lang === 'en') {
        langStatus.value.en = 'lang_active'
        langStatus.value.ru = ''
      } else {
        langStatus.value.ru = 'lang_active'
        langStatus.value.en = ''
      }
    }

    setStatus()

    function setLanguage (lang) {
      $store.state.lang = lang
      setStatus()
    }

    return {
      langStatus,
      setLanguage
    }
  }
})
</script>

<style scoped lang="scss">
  // $lang-width: calc(50% - 10px);
  $primary-color: #22475a;
  $light-primary-color: #ffffff;
  $active-color: #6e4241;
  $focused-color: #b96246;
  .switches {
    width: 10%;
  }
  .lang {
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding-top: 0.5rem;
    height: 100%;
    width: 50%;
    font-size: .8rem;
    color: $light-primary-color;
    transition: all 0.2s ease-in-out;
  }

  .lang__checkbox {
    display: none;
  }

  .lang__custom-checkbox {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: inline-block;
    text-align: center;
    height: 100%;
    width: 100%;
    background-color: $primary-color;
    transition: all .4s ease-in-out;
  }

  .lang__custom-checkbox_left {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }

  .lang__custom-checkbox_right {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }

  .lang_active {
    .lang__custom-checkbox {
      background-color:  $active-color;
    }
  }
</style>
