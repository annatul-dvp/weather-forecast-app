<!-- Block with form for search certain city weather -->
<template>
  <form action="" class="form">
    <input type="text" list="cities_datalist" class="input"
      v-model.trim="searchName" placeholder="Введите город"
      @input="searchCity(searchName)">
    <datalist id="cities_datalist" class="datalist">
      <option v-for="city of foundCities" :key="city.id" :value="city.name"/>
    </datalist>
    <button type="submit" class="btn btn-submit">Найти</button>
  </form>
</template>

<script>
import axios from 'axios'
import { API_BASE_URL, theKey } from '@/config'
import { defineComponent, ref } from 'vue'
// import useTranslation from '@/hooks/useTranslation.js'

export default defineComponent({

  setup () {
    const searchName = ref('')

    // watch(() => searchName.value, (newName) => {
    //   searchCity(newName)
    // })

    const foundCities = ref()

    function searchCity (name) {
      // const englishName = useTranslation(name, 'auto', 'en')
      console.log('Запущена')
      // const searchIsStarted = ref(false)
      if (name !== '') {
        // searchIsStarted.value = true
        foundCities.value = axios.get(`${API_BASE_URL}search.json?key=${theKey}&q=${name}`)
          .then(response => {
            // response.data.forEach((city) => foundCities.value.push(city))
            foundCities.value = response.data
            console.log(response.data)
            console.log(foundCities.value)
          })
          .catch(error => {
            console.log(error)
          })
      }
      // else {
      //   searchIsStarted.value = false
      // }
    }

    return {
      searchName,
      searchCity,
      foundCities
    }
  }
})
</script>

<style scoped lang="scss" >
$primary-color: #22475a;
$light-primary-color: #ffffff;
$active-color: #6e4241;
$focused-color: #b96246;
$light-color: #eec583;
$middle-color: #ef8d50;

.form {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input {
  height: 100%;
  width: 65%;
  margin-right: 2%;
}

.btn {
  width: 33%;
  background-color: $primary-color;
  color: $light-primary-color;
}

</style>
