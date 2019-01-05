<template>
  <div class="basic-textarea">
    <p class="label">{{textarea.label}}</p>
    <textarea :rows="rows ? rows : 30" :cols="cols ? cols : __window.width >= 600 ? 65 : 30" class="textarea" v-model="textarea.text"></textarea>
  </div>
</template>

<script>
export default {
  props: ['textarea', 'cols', 'rows'],
  computed: {
    __window () {
      return this.$store.state.window
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
