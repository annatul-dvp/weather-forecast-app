<template>
  <div class="compact-city">
    <h4 class="h4 compact-city__name">City name</h4>
    <div class="compact-city__temp">Температура: +7 С </div>
    <div class="compact-city__temp-feels-like">Ощущается как {{ value }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 125
    }
  }
}
</script>

<style scoped lang="scss">
  .compact-city {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    height: 200px;

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
  }
</style>
