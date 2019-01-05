<template>
  <div class="basic-input">
    <p class="label">{{input.label}}</p>
    <input class="input" :type="input.type" v-model="input.text">
  </div>
</template>

<script>
export default {
  props: ['input']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
