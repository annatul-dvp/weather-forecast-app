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
    <div class="compact-city__temp">{{ websiteText.tempTxt }}{{ weatherData.temp_c_txt }}</div>
    <div class="compact-city__temp-feels-like">{{ websiteText.feelslikeTxt }}{{ weatherData.feelslike_c_txt }}</div>
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
  .compact-city {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    &__name {
      margin-top: 8%;
      margin-bottom: 15px;
      font-size: 1.5rem;
    }

    &__temp,
    &__temp-feels-like {
      font-size: 1rem;
    }

    &__temp-feels-like {
      margin-bottom: 8%;
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
</style>
