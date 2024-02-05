<template>
  <div v-if="weatherStatus.isLoading" class="compact-city">
    <h4 class="h4 compact-city__name">{{ nameRu }}</h4>
    <div>Идёт загрузка данных о погоде...</div>
  </div>
  <div v-else-if="weatherStatus.isFailed" class="compact-city">
    <h4 class="h4 compact-city__name">{{ nameRu }}</h4>
    <div>Не удалось загрузить данные о погоде</div>
  </div>
  <div v-else class="compact-city">
    <h4 class="h4 compact-city__name">{{ nameRu }}</h4>
    <div class="compact-city__temp">Температура: {{ weatherData.temp_c }} С </div>
    <div class="compact-city__temp-feels-like">Ощущается как: {{ weatherData.feelslike_c }} С </div>
    <picture class="compact-city__picture">
      <source :srcset=weatherData.condition.icon />
      <img class="compact-city__img" :src=weatherData.condition.icon :alt=weatherData.condition.text />
    </picture>
  </div>
</template>

<script>
import useCityWeatherInfo from '@/hooks/useCityWeatherInfo'
import { defineComponent } from 'vue'
// import { computed } from 'vue'
// import { ref } from 'vue'

export default defineComponent({
  props: {
    names: { type: Object, required: true }
  },
  setup (props) {
    const {
      weatherData,
      status: weatherStatus,

      fetchWeather
    } = useCityWeatherInfo()

    fetchWeather(props.names.eng)

    // const weather = computed(() => weatherData)

    return {
      nameEng: props.names.eng,
      nameRu: props.names.ru,
      value: 125,

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
    // height: 200px;

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
