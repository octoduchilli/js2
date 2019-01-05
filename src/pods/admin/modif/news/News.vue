<template>
  <div class="news column width">
    <h1 class="title-sentence">Actualités</h1>
    <modif-card-list :list="__news"/>
  </div>
</template>

<script>
import modifCardList from '@/lib/pods/admin/modif/modif-card-list/Component'

export default {
  components: {
    modifCardList
  },
  computed: {
    __news () {
      return this.$store.state.news
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
