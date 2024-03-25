<template>
  <div v-if="weatherStatus.isLoading" class="compact-city">
    <h4 class="h4 compact-city__name">{{ theName }}</h4>
    <div>{{ websiteText.loadingDataMsg }}</div>
  </div>
  <div v-else-if="weatherStatus.isFailed" class="compact-city">
    <h4 class="h4 compact-city__name">{{ theName }}</h4>
    <div>{{ websiteText.errorLoadingDataMsg }}</div>
  </div>
  <div v-else class="compact-city">
    <h4 class="h4 compact-city__name">{{ theName }}</h4>
    <div class="compact-city__temp">{{ websiteText.tempTxt }}{{ weatherData.temp_c_txt }} / {{ weatherData.temp_f_txt }}</div>
    <div class="compact-city__temp-feels-like">{{ websiteText.feelslikeTxt }}{{ weatherData.feelslike_c_txt }} / {{ weatherData.feelslike_f_txt }}</div>
    <picture class="compact-city__picture">
      <source :srcset=weatherData.condition.icon />
      <img class="compact-city__img" :src=weatherData.condition.icon :alt=weatherData.condition.text />
    </picture>
  </div>
</template>

<script>
import useCityWeatherInfo from '@/hooks/useCityWeatherInfo'
import { defineComponent, watch, ref, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    names: { type: Object, required: true }
  },
  setup (props) {
    const $store = useStore()
    const lang = computed(() => $store.getters.getCurrentLang)
    const websiteText = computed(() => $store.getters.getWebsiteText)

    const theName = ref('')
    watch(() => lang.value, (lang) => {
      if (lang === 'ru') {
        theName.value = props.names.ru
      } else {
        theName.value = props.names.eng
      }
    }, { immediate: true })

    const {
      weatherData,
      status: weatherStatus,

      fetchWeather
    } = useCityWeatherInfo()

    fetchWeather(theName.value)

    return {
      theName,
      websiteText,

      weatherData,
      weatherStatus
    }
  }
})
</script>

<style scoped lang="scss">
  @import '@/styles/variables.scss';
  @import '@/styles/mixins.scss';
  .compact-city {
    position: relative;
    @include display-flex (column, center, flex-start);

    &__name {
      // margin-top: 5%;
      margin-bottom: 5%;
      font-size: 1.5rem;
    }

    &__temp,
    &__temp-feels-like {
      margin-bottom: 5%;
      font-size: 1rem;
    }

    &__picture {
      position: absolute;
      right: 10px;
      top: 50%;
      width: 25%;
      transform: translateY(-50%);
    }

    &__img {
      z-index: -1;
      width: 100%;
      opacity: .5;
    }
  }

  @media screen and (max-width: 1280px) {
    .compact-city {
      &__name {
        // margin-top: 0;
        margin-bottom: 5px;
        font-size: 1.3rem;
      }

      &__temp,
      &__temp-feels-like {
        margin-bottom: 2px;
      }

      &__picture {
        width: 18%;
      }
    }
  }

  @media screen and (max-width: 960px) {
    .compact-city {
      &__name {
        // margin-top: 0;
        margin-bottom: 1%;
      }

      &__temp,
      &__temp-feels-like {
        font-size: .9rem;
      }

      &__picture {
        width: 10%;
      }
    }
  }

  @media screen and (max-width: 620px) {
    .compact-city {
      &__name {
        font-size: 1.2rem;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) {
    .compact-city {
      @include display-flex (column, center, normal, wrap);

      &__name,
      &__temp,
      &__temp-feels-like {
        text-align: left;
        width: 100%;
      }

      &__name {
        margin-bottom: 4%;
      }

      &__temp,
      &__temp-feels-like {
        margin-bottom: 2%;
      }

      &__picture {
        width: 20%;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 1280px) {
    .compact-city {
      &__picture {
        width: 20%;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 960px) {
    .compact-city {
      @include display-flex (row, space-evenly, center, wrap);
      &__name {
        font-size: 1.2rem;
      }

      &__name,
      &__temp,
      &__temp-feels-like {
        margin-bottom: 0;
      }
    }
  }

  @media screen and (orientation: $orient-portrait) and (max-width: 640px) {
    .compact-city {
      @include display-flex (row, space-evenly, flex-start, wrap);
      &__name,
      &__temp,
      &__temp-feels-like {
        text-align: center;
      }

      &__name {
        // margin-top: 0;
        width: 100%;
        font-size: 1.5rem;
      }

      &__temp,
      &__temp-feels-like {
        width: 100%;
      }

      &__picture {
        display: none;
      }
    }
  }
</style>
