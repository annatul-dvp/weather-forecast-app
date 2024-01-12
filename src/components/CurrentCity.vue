<template>
  <div class="container detailed-weather">
    <!-- <h2>Погода</h2> -->
    <div class="detailed-weather__city-name">
      Москва
    </div>
    <div class="detailed-weather__current-time">13:20</div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Температура:</span>
      <span class="detailed-weather__temp">-10 C</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Ощущается, как:</span>
      <span class="detailed-weather__curr-temp">-20 C</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Осадки:</span>
      <span class="detailed-weather__precip">50%</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Влажность:</span>
      <span class="detailed-weather__humidity">50%</span>
    </div>
    <div class="detailed-weather__info">
      <span class="span-smth-name">Давление:</span>
      <span class="detailed-weather__pressure">20</span>
    </div>
  </div>
</template>

<style lang="scss">
  %flex-column-left-sided {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .detailed-weather {
    @extend %flex-column-left-sided;
    // display: flex;
    // flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    // align-items: flex-start;
    // height:350px;

    &__city-name,
    &__current-time{
      @extend %flex-column-left-sided;
      // display: flex;
      // flex-direction: column;
      // align-items: flex-start;
      padding-left: 5%;
      width: 40%;
      height: 50%;
    }

    &__city-name {
      justify-content: end;
      font-size: 4rem;
    }
    &__current-time {
      justify-content: start;
      font-size: 1rem;
      font-style: italic;
    }

    &__info {
      display: flex;
      flex-direction: row;
      width: 60%;
      margin-bottom: 25px;
      font-size: 1.2rem;
    }
  }
</style>
