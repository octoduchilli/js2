<template>
  <div class="show-new column">
    <div @click="$router.go(-1)" class="back row align-center">
      <img class="back-arrow" src="/static/img/buttons/basics/left-arrow-white.png" alt="ARROW">
      <p class="back-label">RETOUR</p>
    </div>
    <basic-article v-if="__new" :article="__new"/>
    <h1 class="text-center" v-else>Un instant...</h1>
    <basic-message-list style="margin: 75px 0;" v-if="messages.list" :messages="messages"/>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  data () {
    return {
      messages: {
        from: 'news',
        id: null,
        list: null
      }
    }
  },
  computed: {
    __new () {
      return this.$store.state.news.content.find(_ => _.id === Number(this.$route.params.id)) || null
    }
  },
  watch: {
    '__new' (article) {
      this.fetchMessages(article)
    }
  },
  created () {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    })

    this.fetchMessages(this.__new)
  },
  methods: {
    fetchMessages (article) {
      if (article) {
        db.ref(`messages/news/${article.id}`).on('value', snap => {
          let final = []

          for (var index in snap.val()) {
            var attr = snap.val()[index]
            final.push(attr)
          }

          final.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })

          this.messages.list = final
          this.messages.id = article.id
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
