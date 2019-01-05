<template>
  <router-link class="basic-link-button link row align-center justi-center" :class="{'row-reverse': rowReverse}" :to="button.path">
    <img class="link-image" :src="button.logo" alt=" ">
    <p class="label">{{button.label}}</p>
  </router-link>
</template>

<script>
export default {
  props: ['button', 'rowReverse'],
  destroyed () {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
