<template>
  <div class="basic-dropdown">
    <div @click="dropdown.mouse.click ? dropdown.mouse.click = false : dropdown.mouse.click = true" class="div-label" :class="{'is--selecting': dropdown.mouse.click}">
      <img src="/static/img/buttons/basics/second-arrow-black.png" alt="Arrow" class="label-img">
      <p class="label">{{dropdown.label}}</p>
      <img v-if="dropdown.selected !== 0" src="/static/img/buttons/basics/circle-red.png" alt="Dot" class="item-selected-img animated fadeIn">
    </div>
    <ul v-if="dropdown.mouse.click" class="list-item basic-list animated fadeInUp">
      <li class="item" :class="{'is--selected': dropdown.selected === item.id}" @click="dropdown.selected = item.id" v-for="item in dropdown.content" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['dropdown']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
