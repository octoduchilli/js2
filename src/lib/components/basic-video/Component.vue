<template>
  <div class="basic-video column align-center">
    <h1 class="video-title text-center">{{video.title}}</h1>
    <div class="div-video-frame row justi-center align-center">
      <iframe class="video-frame" :src="video.video.url" frameborder="0" allowfullscreen></iframe>
    </div>
    <div class="column">
      <p class="video-date">Créé le : <span>{{video.createdAt | moment("Do MMMM YYYY à H:mm")}}</span></p>
      <p class="video-date" v-if="video.modifiedAt">Modifié le : <span>{{video.modifiedAt | moment("Do MMMM YYYY à H:mm")}}</span></p>
      <p class="video-main" v-html="noDoubleCote(video.main)"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['video'],
  computed: {
    __window () {
      return this.$store.state.window
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
