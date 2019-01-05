<template>
  <div @click="button.click = true" class="basic-button flex align-center justi-center">
    <p class="label">{{$t(button.label)}}</p>
  </div>
</template>

<script>
export default {
  props: ['button']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
