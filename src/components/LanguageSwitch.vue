<template>
<div>
  <label class="lang">
    <input type="checkbox" class="input lang__checkbox lang__checkbox_eng">
    <span class="lang__custom-checkbox">
    </span>
    English
  </label>
  <label class="lang lang_active">
    <input type="checkbox" class="input lang__checkbox lang__checkbox_ru">
    <span class="lang__custom-checkbox"></span>
    Русский
  </label>
</div>
</template>

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
    transition: all 0.2s ease-in-out;
  }

  .lang_active {
    .lang__custom-checkbox {
      background-color:  $active-color;
    }
  }
</style>
