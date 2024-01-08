<template>
  <div class="city">
    <h4 class="h4 city__name">City name</h4>
    <div class="city__temp">Температура: +7 С </div>
    <div class="city__temp-feels-like">Ощущается как <vue-number>+5.5</vue-number></div>
    <vue-number
      v-model:value="value"
      :options="{ precision: 3, prefix: '', suffix: ' kg', decimal: '', thousand: '', acceptNegative: false, isInteger: false  }"
    ></vue-number>
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
// import { component as VueNumber } from '@coders-tm/vue-number-format'

// export default {
//   components: {
//     VueNumber
//   },

//   data () {
//     return {
//       price: 123.45,
//       number: {
//         decimal: '.',
//         separator: ',',
//         prefix: '$ ',
//         precision: 2,
//         masked: false
//       }
//     }
//   }
// }
</script>

<style scoped lang="scss">
.city {
  width: 20%;
}
</style>
