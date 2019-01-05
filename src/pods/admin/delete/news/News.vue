<template>
  <div class="news column align-center width">
    <h1 class="title-sentence">Actualités</h1>
    <delete-card-list :list="__news"/>
  </div>
</template>

<script>
import deleteCardList from '@/lib/pods/admin/delete/delete-card-list/Component'

export default {
  components: {
    deleteCardList
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
