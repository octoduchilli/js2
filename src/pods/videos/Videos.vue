<template>
  <div class="videos column align-center">
    <h1 class="title-sentence">Je Science donc Je Filme</h1>
    <p class="normal-sentence">Parce que regarder une vidéo nous parle souvent plus que lire des articles, nous avons décidé d'ouvrir une chaine youtube où l'on filmera divers projets scientifiques, des interviews, des micro-trottoirs et bien d'autres choses. N'hésitez pas à laisser un pouce bleu à nos vidéos si elles vous plaisent mais également à laisser un petit commentaire.<br><br> L'équipe de JS² vous souhaite un bon visionnage !</p>
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
        return ('' + a.title).localeCompare(b.title)
      })
    },
    toZA () {
      let videos = this.videos

      videos.content.sort((a, b) => {
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
