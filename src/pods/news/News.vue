<template>
  <div class="news column align-center">
    <h1 class="title-sentence">{{$t('new.title')}}</h1>
    <p class="normal-sentence" v-html="$t('new.description')"></p>
    <div class="filters" :class="[__window.width <= 900 ? 'column' : 'row']">
      <basic-dropdown class="margin-10" :dropdown="news.filters.date"/>
      <basic-dropdown class="margin-10" :dropdown="news.filters.title"/>
    </div>
    <basic-card-list :list="news"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      news: null
    }
  },
  created () {
    this.$store.state.route.selected = 2

    this.news = this.$store.state.news

    let filters = this.news.filters

    let id = filters.date.selected
    if (id === 1) {
      this.toOld()
    } else if (id === 2) {
      this.toNew()
    }

    id = filters.title.selected
    if (id === 1) {
      this.toAZ()
    } else if (id === 2) {
      this.toZA()
    }
  },
  destroyed () {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  },
  computed: {
    __window () {
      return this.$store.state.window
    }
  },
  watch: {
    '$store.state.news' (content) {
      if (!this.news) {
        this.news = this.$store.state.news
      }
    },
    'news.filters.date.selected' (id) {
      if (id) {
        if (id === 1) {
          this.toOld()
        } else if (id === 2) {
          this.toNew()
        }

        this.news.filters.title.selected = 0
      }
    },
    'news.filters.title.selected' (id) {
      if (id) {
        if (id === 1) {
          this.toAZ()
        } else if (id === 2) {
          this.toZA()
        }

        this.news.filters.date.selected = 0
      }
    }
  },
  methods: {
    toOld () {
      let news = this.news

      news.content.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    toNew () {
      let news = this.news

      news.content.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    toAZ () {
      let news = this.news

      news.content.sort((a, b) => {
        if (this.$i18n.locale === 'en') {
          return ('' + a.titleEn).localeCompare(b.titleEn)
        }

        return ('' + a.title).localeCompare(b.title)
      })
    },
    toZA () {
      let news = this.news

      news.content.sort((a, b) => {
        if (this.$i18n.locale === 'en') {
          return ('' + b.titleEn).localeCompare(a.titleEn)
        }

        return ('' + b.title).localeCompare(a.title)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
