<template>
  <div class="journals column align-center width">
    <h1 class="title-sentence">Journaux</h1>
    <delete-card-list :list="__journals"/>
  </div>
</template>

<script>
import deleteCardList from '@/lib/pods/admin/delete/delete-card-list/Component'

export default {
  components: {
    deleteCardList
  },
  computed: {
    __journals () {
      return this.$store.state.journals
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
