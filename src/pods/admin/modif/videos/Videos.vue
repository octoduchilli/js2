<template>
  <div class="videos column width">
    <h1 class="title-sentence">Vidéos</h1>
    <modif-card-list :list="__videos"/>
  </div>
</template>

<script>
import modifCardList from '@/lib/pods/admin/modif/modif-card-list/Component'

export default {
  components: {
    modifCardList
  },
  computed: {
    __videos () {
      return this.$store.state.videos
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
