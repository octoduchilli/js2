<template>
  <div class="videos column align-center width">
    <h1 class="title-sentence">Vidéos</h1>
    <delete-card-list :list="__videos"/>
  </div>
</template>

<script>
import deleteCardList from '@/lib/pods/admin/delete/delete-card-list/Component'

export default {
  components: {
    deleteCardList
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
