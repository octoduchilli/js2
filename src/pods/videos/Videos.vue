<template>
  <div class="videos column align-center">
    <h1 class="title-sentence">{{$t('video.title')}}</h1>
    <p class="normal-sentence" v-html="$t('video.description')"></p>
    <div class="filters" :class="[__window.width <= 900 ? 'column' : 'row']">
      <basic-dropdown class="margin-10" :dropdown="videos.filters.date"/>
      <basic-dropdown class="margin-10" :dropdown="videos.filters.title"/>
    </div>
    <basic-card-list :list="videos"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      videos: null
    }
  },
  created () {
    this.$store.state.route.selected = 3

    this.videos = this.$store.state.videos

    let filters = this.videos.filters

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
    '$store.state.videos' (content) {
      if (!this.videos) {
        this.videos = this.$store.state.videos
      }
    },
    'videos.filters.date.selected' (id) {
      if (id) {
        if (id === 1) {
          this.toOld()
        } else if (id === 2) {
          this.toNew()
        }

        this.videos.filters.title.selected = 0
      }
    },
    'videos.filters.title.selected' (id) {
      if (id) {
        if (id === 1) {
          this.toAZ()
        } else if (id === 2) {
          this.toZA()
        }

        this.videos.filters.date.selected = 0
      }
    }
  },
  methods: {
    toOld () {
      let videos = this.videos

      videos.content.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    toNew () {
      let videos = this.videos

      videos.content.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    toAZ () {
      let videos = this.videos

      videos.content.sort((a, b) => {
        if (this.$i18n.locale === 'en') {
          return ('' + a.titleEn).localeCompare(b.titleEn)
        }

        return ('' + a.title).localeCompare(b.title)
      })
    },
    toZA () {
      let videos = this.videos

      videos.content.sort((a, b) => {
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
