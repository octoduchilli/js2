<template>
  <div class="journals column align-center">
    <h1 class="title-sentence">{{$t("journal.title")}}</h1>
    <p class="normal-sentence" v-html="$t('journal.description')"></p>
    <div class="filters" :class="[__window.width <= 900 ? 'column' : 'row']">
      <basic-dropdown class="margin-10" :dropdown="journals.filters.date"/>
      <basic-dropdown class="margin-10" :dropdown="journals.filters.title"/>
    </div>
    <basic-card-list :list="journals"/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      journals: null
    }
  },
  created () {
    this.$store.state.route.selected = 1

    this.journals = this.$store.state.journals

    let filters = this.journals.filters

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
    '$store.state.journals' (content) {
      if (!this.journals) {
        this.journals = this.$store.state.journals
      }
    },
    'journals.filters.date.selected' (id) {
      if (id) {
        if (id === 1) {
          this.toOld()
        } else if (id === 2) {
          this.toNew()
        }

        this.journals.filters.title.selected = 0
      }
    },
    'journals.filters.title.selected' (id) {
      if (id) {
        if (id === 1) {
          this.toAZ()
        } else if (id === 2) {
          this.toZA()
        }

        this.journals.filters.date.selected = 0
      }
    }
  },
  methods: {
    toOld () {
      let journals = this.journals

      journals.content.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    toNew () {
      let journals = this.journals

      journals.content.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })
    },
    toAZ () {
      let journals = this.journals

      journals.content.sort((a, b) => {
        if (this.$i18n.locale === 'en') {
          return ('' + a.titleEn).localeCompare(b.titleEn)
        }

        return ('' + a.title).localeCompare(b.title)
      })
    },
    toZA () {
      let journals = this.journals

      journals.content.sort((a, b) => {
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
