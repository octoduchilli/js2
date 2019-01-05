<template>
  <div class="basic-article width justi-around align-center" :class="[__window.width <= 800 ? 'column' : 'row']">
    <h1 class="article-title text-center" v-if="__window.width < 800">{{__article.title}}</h1>
    <div class="article-image flex justi-center align-center">
      <img class="image pointer" @click="show.image.url = __article.images[images.selected].url" :src="__article.images[images.selected].url" alt="Image" onerror="this.src='/static/img/logo/no-bg.png';"/>
      <div v-if="images.selected" @click="images.selected--" class="button-switch previous">
        <img class="arrow" src="/static/img/buttons/basics/left-arrow-white.png" alt="Previous">
      </div>
      <div v-if="images.selected !== __article.images.length - 1 && __article.images[images.selected + 1].url" @click="images.selected++" class="button-switch next">
        <img class="arrow" src="/static/img/buttons/basics/left-arrow-white.png" alt="Next" onerror="this.onerror=null; this.style.transform = 'rotate(0deg)';">
      </div>
    </div>
    <div class="column align-start padding-10">
      <h1 class="article-title text-center" v-if="__window.width >= 800">{{__article.title}}</h1>
      <p class="article-date">{{$t('created_at')}} : <span>{{__article.createdAt | moment("Do MMMM YYYY - H:mm")}}</span></p>
      <p class="article-date" v-if="__article.modifiedAt">{{$t('modified_at')}} : <span>{{__article.modifiedAt | moment("Do MMMM YYYY - H:mm")}}</span></p>
      <p class="article-main" v-html="noDoubleCote(__article.main)"></p>
    </div>
    <basic-show-image v-if="show.image.url" :image="show.image"/>
  </div>
</template>

<script>
export default {
  props: ['article'],
  data () {
    return {
      images: {
        selected: 0
      },
      show: {
        image: {
          url: null
        }
      }
    }
  },
  computed: {
    __window () {
      return this.$store.state.window
    },
    __article () {
      if (this.$i18n.locale !== 'en') {
        return this.article
      } else {
        let article = JSON.parse(JSON.stringify(this.article))

        if (article.titleEn) {
          article.title = article.titleEn
        }

        if (article.mainEn) {
          article.main = article.mainEn
        }

        return article
      }
    }
  },
  methods: {
    noDoubleCote (string) {
      let final = ''

      for (let i = 0; i < string.length; i++) {
        if (!(i === 0 && string[i] === '"') && !(i === string.length - 1 && string[i] === '"')) {
          final += string[i]
        }
      }

      return final
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
