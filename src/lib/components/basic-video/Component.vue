<template>
  <div class="basic-video column align-center">
    <h1 class="video-title text-center">{{__video.title}}</h1>
    <div class="div-video-frame row justi-center align-center">
      <iframe class="video-frame" :src="__video.video.url" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="column">
      <p class="video-date">{{$t('created_at')}} : <span>{{__video.createdAt | moment("Do MMMM YYYY - H:mm")}}</span></p>
      <p class="video-date" v-if="__video.modifiedAt">{{$t('modified_at')}} : <span>{{__video.modifiedAt | moment("Do MMMM YYYY - H:mm")}}</span></p>
      <p class="video-main" v-html="noDoubleCote(__video.main)"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['video'],
  computed: {
    __window () {
      return this.$store.state.window
    },
    __video () {
      if (this.$i18n.locale !== 'en') {
        return this.video
      } else {
        let video = JSON.parse(JSON.stringify(this.video))

        if (video.titleEn) {
          video.title = video.titleEn
        }

        if (video.mainEn) {
          video.main = video.mainEn
        }

        return video
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
