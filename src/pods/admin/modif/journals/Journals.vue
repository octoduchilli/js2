<template>
  <div class="journals column width">
    <h1 class="title-sentence">Journaux</h1>
    <modif-card-list :list="__journals"/>
  </div>
</template>

<script>
import modifCardList from '@/lib/pods/admin/modif/modif-card-list/Component'

export default {
  components: {
    modifCardList
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
