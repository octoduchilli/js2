<template>
  <div class="home">
    <section>
      <img class="logo animated fadeInLeft" :src="`${logo.mouseover ? '/static/img/logo/no-bg.png' : '/static/img/logo/base.png'}`" @mouseover="logo.mouseover = true" @mouseout="logo.mouseover = false" alt="JS2">
      <h1 class="logo-title">{{$t("home.title")}}</h1>
    </section>
    <section>
      <p class="normal-sentence">{{$t("home.description")}}</p>
      <h1 class="title-sentence text-center">{{$t("home.last_article")}} :</h1>
      <div class="last-articles" v-if="__list" v-for="list in __list" :key="list.id">
        <basic-card-list v-if="list.content" :list="list"/>
        <basic-link-button style="width: 200px; margin: 10px auto" :button="list.button"/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      logo: {
        mouseover: false
      }
    }
  },
  created () {
    this.$store.state.route.selected = 0
  },
  computed: {
    __window () {
      return this.$store.state.window
    },
    __lastCreatedJournal () {
      let last = null
      let list = JSON.parse(JSON.stringify(this.$store.state.journals.content))

      list.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      return list[0] || null
    },
    __lastCreatedNew () {
      let last = null
      let list = JSON.parse(JSON.stringify(this.$store.state.news.content))

      list.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      return list[0] || null
    },
    __lastCreatedVideo () {
      let last = null
      let list = JSON.parse(JSON.stringify(this.$store.state.videos.content))

      list.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      return list[0] || null
    },
    __list () {
      let list = []
      let journal = this.__lastCreatedJournal
      let article = this.__lastCreatedNew
      let video = this.__lastCreatedVideo

      if (journal || article || video) {
        list.push({
          id: 1,
          name: 'journals',
          show: {
            sentence: 'see_journal'
          },
          logo: '/static/img/buttons/header/newspaper-black.png',
          button: {
            path: '/journals',
            label: 'home.journal_list',
            logo: '/static/img/buttons/header/newspaper-white.png'
          },
          content: journal ? [journal] : null
        })

        list.push({
          id: 2,
          name: 'news',
          show: {
            sentence: 'see_new',
          },
          logo: '/static/img/buttons/header/news-black.png',
          button: {
            path: '/news',
            label: 'home.new_list',
            logo: '/static/img/buttons/header/news-white.png'
          },
          content: article ? [article] : null
        })

        list.push({
          id: 3,
          name: 'videos',
          show: {
            sentence: 'see_video',
          },
          logo: '/static/img/buttons/header/play-black.png',
          button: {
            path: '/videos',
            label: 'home.video_list',
            logo: '/static/img/buttons/header/play-white.png'
          },
          content: video ? [video] : null
        })
      }

      return list.length > 0 ? list : null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
