<template>
  <div class="basic-show-image">
    <p class="pointer unselectable" @click="image.url = null">{{$t('click_to_quit')}}</p>
    <img id="show-image" class="image" :src="image.url" alt="Image">
    <p @click="rotateImage()" class="pointer unselectable">{{$t('rotate_image')}}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      rotate: 0
    }
  },
  props: ['image'],
  methods: {
    rotateImage () {
      this.rotate++

      let r = this.rotate
      let a = document.getElementById('show-image')

      a.style.transform = `rotate(${r * 90}deg)`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
