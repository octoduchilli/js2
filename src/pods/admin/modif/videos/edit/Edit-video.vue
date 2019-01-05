<template>
  <div v-if="__video" class="edit-video column width">
    <h1 class="title-sentence">video - {{__video.title}}</h1>
    <div @click="$router.go(-1)" class="back row align-center">
      <img class="back-arrow" src="/static/img/buttons/basics/left-arrow-white.png" alt="ARROW">
      <p class="back-label">RETOUR</p>
    </div>
    <div class="width column align-center" v-if="!modified">
      <basic-input class="margin-20" :input="title.input"/>
      <basic-input class="margin-20" :input="video.url.input"/>
      <p class="margin-20">*L'url de la vidéo doit nécessairement commencer par : https://www.youtube.com/embed/...</p>
      <basic-input class="margin-20" :input="card.description.input"/>
      <basic-input class="margin-20" :input="card.miniature.url.input"/>
      <basic-textarea class="margin-20" :textarea="main.input"/>
      <basic-button style="margin: auto" :button="button"/>
      <h1 class="title-sentence">Aperçu globale</h1>
      <p class="text-center">* L'aperçu est visible une fois l'ensemble des champs remplis *</p>
      <div v-if="__list" class="width column align-center">
        <basic-card-list :list="__list" :noLink="true"/>
        <div v-if="__list.content[0]" class="show-video width column align-center">
          <h1 class="video-title">{{__list.content[0].title}}</h1>
          <div class="div-video-frame row justi-center align-center">
            <iframe class="video-frame" :src="__checkVideoUrl" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="column">
            <p class="video-date">Créé le : <span>{{__list.content[0].createdAt | moment("Do MMMM YYYY à H:mm")}}</span></p>
            <p class="video-date" v-if="__list.content[0].modifiedAt">Modifié le : <span>{{__list.content[0].modifiedAt | moment("Do MMMM YYYY à H:mm")}}</span></p>
            <p class="video-main" v-html="noDoubleCote(__list.content[0].main)"></p>
          </div>
        </div>
      </div>
    </div>
    <h1 v-else class="text-center margin-20">Modifications enregistrées !</h1>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  data () {
    return {
      modified: false,
      title: {
        input: {
          label: 'Titre',
          text: '',
          type: 'text'
        }
      },
      video: {
        url: {
          input: {
            label: 'Url de la vidéo',
            text: '',
            type: 'text'
          }
        }
      },
      card: {
        description: {
          input: {
            label: 'Descriptif de la card',
            text: '',
            type: 'text'
          }
        },
        miniature: {
          url: {
            input: {
              label: 'Url de la miniature',
              text: '',
              type: 'text'
            }
          }
        }
      },
      main: {
        input: {
          label: 'Texte principale',
          text: ''
        }
      },
      button: {
        click: false,
        label: 'MODIFIER'
      }
    }
  },
  mounted () {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    })
  },
  computed: {
    __window () {
      return this.$store.state.window
    },
    __video () {
      let video = this.$store.state.videos.content.find(_ => _.id === Number(this.$route.params.id)) || null

      if (video) {
        this.title.input.text = video.title
        this.video.url.input.text = video.video.url
        this.card.description.input.text = video.card.description
        this.card.miniature.url.input.text = video.card.miniature.url
        this.main.input.text = video.main
      }

      return video
    },
    __list () {
      let title = this.title
      let video = this.video
      let card = this.card
      let main = this.main

      let list = {
        content: [],
        name: 'videos',
        show: {
          sentence: 'Voir le video'
        },
        logo: '/static/img/buttons/header/newspaper-black.png'
      }

      if (title.input.text && video.url.input.text && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        list.content.push({
          id: this.__video.id,
          title: title.input.text,
          video: {
            url: video.url.input.text
          },
          card: {
            description: card.description.input.text,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
          createdAt: this.__video.createdAt
        })

        return list
      }

      return null
    },
    __checkVideoUrl () {
      let url = this.video.url.input.text

      let index = url.indexOf('https://www.youtube.com/embed/')

      if (index !== -1) {
        return url
      }

      return null
    }
  },
  watch: {
    'button.click' (click) {
      if (click) {
        this.modif()
      }

      this.button.click = false
    }
  },
  methods: {
    modif () {
      let title = this.title
      let video = this.video
      let card = this.card
      let main = this.main
      let date = new Date()

      if (title.input.text && video.url.input.text && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        db.ref(`videos/${this.__video.id}`).update({
          title: title.input.text,
          video: {
            url: video.url.input.text
          },
          card: {
            description: card.description.input.text,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
          modifiedAt: date.toString()
        }).then(_ => {
          this.modified = true
        })
      }
    },
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
