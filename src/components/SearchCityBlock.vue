<!-- Block with form for search certain city weather -->
<template>
  <form action="" class="form">
    <input type="text" list="cities_datalist" class="input">
    <datalist id="cities_datalist" class="datalist">
      <!-- <option value="Cat"/>
      <option value="Dog"/> -->
    </datalist>
    <button type="submit" class="btn btn-submit">Найти</button>
  </form>
</template>

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
