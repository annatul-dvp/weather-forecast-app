<template>
<div>
  <label class="lang" :class="langStatus.en">
    <input type="checkbox" class="input lang__checkbox lang__checkbox_eng" @click="setLanguage('en')">
    <span class="lang__custom-checkbox lang__custom-checkbox_left">
    </span>
    <span class="lang__text">{{ languages.en }}</span>
  </label>
  <label class="lang" :class="langStatus.ru">
    <input type="checkbox" class="input lang__checkbox lang__checkbox_ru" @click="setLanguage('ru')">
    <span class="lang__custom-checkbox lang__custom-checkbox_right"></span>
    <span class="lang__text">{{ languages.ru }}</span>
  </label>
</div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useScreenOrientation } from '@vueuse/core'

export default defineComponent({
  setup () {
    const {
      orientation
    } = useScreenOrientation()

    const languages = ref({
      en: 'English',
      ru: 'Русский'
    })

    function setLangStyle (en, ru) {
      languages.value.en = en
      languages.value.ru = ru
    }

    watch(() => orientation.value, (newOrintation) => {
      if (newOrintation.includes('portrait')) {
        setLangStyle('Eng', 'Рус')
      } else {
        setLangStyle('English', 'Русский')
      }
    }, { immediate: true })

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
      $store.commit('setLang', lang)
      $store.commit('setWebsitedData')
      $store.commit('changeCurrentWeatherData')
      $store.commit('changeForecastWeatherData')
      $store.dispatch('toTranslateCityName')
      setStatus()
    }

    return {
      languages,

      langStatus,
      setLanguage
    }
  }
})
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';

  .switches {
    width: 10%;
  }
  .lang {
    cursor: pointer;
    display: inline-block;
    position: relative;
    // padding-top: 0.5rem;
    height: 100%;
    width: 50%;
    font-size: .95rem;
    color: $light-primary-color;
    transition: all .2s ease-in-out;

    &__checkbox {
      display: none;
    }

    &__custom-checkbox {
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

    &__custom-checkbox_left {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &__custom-checkbox_right {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }

    &__text {
      display: inline-block;
      top: 50%;
      transform: translateY(-50%);
      @include text-to-choose($light-primary-color);
    }

    &:hover {
      .lang__text {
        &::after {
          opacity: 1;
        }
      }
    }
  }

  .lang_active {
    .lang__custom-checkbox {
      background-color:  $active-color;
    }
  }

  @media screen and (max-width: 960px) {
    .lang {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-top: 0;
      height: 50%;
      width: 100%;

      &__custom-checkbox_left {
        // border-top-left-radius: 6px;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
      }

      &__custom-checkbox_right {
        border-bottom-left-radius: 6px;
        border-top-right-radius: 0;
        // border-bottom-right-radius: 6px;
      }

      &__text {
        top: auto;
        transform: translateY(0);
        &::after{
          display: none;
        }
      }
    }
  }
</style>
