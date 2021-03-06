<template>
  <div class="videos column width">
    <h1 class="title-sentence">Vidéos</h1>
    <div class="width column align-center" v-if="!created">
      <basic-input class="margin-20" :input="title.input"/>
      <basic-input class="margin-20" :input="titleEn.input"/>
      <basic-input class="margin-20" :input="video.url.input"/>
      <p class="margin-20">*L'url de la vidéo doit nécessairement commencer par : https://www.youtube.com/embed/</p>
      <basic-input class="margin-20" :input="card.description.input"/>
      <basic-input class="margin-20" :input="card.descriptionEn.input"/>
      <basic-input class="margin-20" :input="card.miniature.url.input"/>
      <basic-textarea class="margin-20" :textarea="main.input"/>
      <basic-textarea class="margin-20" :textarea="mainEn.input"/>
      <basic-button style="margin: auto" :button="button"/>
      <h1 class="title-sentence">Aperçu globale</h1>
      <p class="text-center">* L'aperçu est visible une fois l'ensemble des champs remplis (sauf anglais) *</p>
      <p class="text-center">* S'il n'y a pas de texte en anglais, le texte en français sera pris par défaut *</p>
      <div v-if="__list" class="width column align-center">
        <basic-card-list :list="__list" :noLink="true"/>
        <div v-if="__list.content[0]" class="show-video width column align-center">
          <h1 class="video-title">{{__list.content[0].title}}</h1>
          <div class="div-video-frame row justi-center align-center">
            <iframe class="video-frame" :src="__checkVideoUrl" frameborder="0" allowfullscreen></iframe>
          </div>
          <div class="column">
            <p class="video-date">{{$t('created_at')}} : <span>{{__list.content[0].createdAt | moment("Do MMMM YYYY - H:mm")}}</span></p>
            <p class="video-date" v-if="__list.content[0].modifiedAt">{{$t('modified_at')}} : <span>{{__list.content[0].modifiedAt | moment("Do MMMM YYYY - H:mm")}}</span></p>
            <p class="video-main" v-html="noDoubleCote(__list.content[0].main)"></p>
          </div>
        </div>
      </div>
    </div>
    <h1 v-else class="text-center">Vidéo créée !</h1>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  data () {
    return {
      created: null,
      title: {
        input: {
          label: 'Titre',
          text: '',
          type: 'text'
        }
      },
      titleEn: {
        input: {
          label: 'Titre - Anglais',
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
        descriptionEn: {
          input: {
            label: 'Descriptif de la card - Anglais',
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
      mainEn: {
        input: {
          label: 'Texte principale - Anglais',
          text: ''
        }
      },
      button: {
        click: false,
        label: 'CREER'
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
    __videos () {
      return this.$store.state.videos
    },
    __list () {
      let title = this.title
      let titleEn = this.titleEn
      let video = this.video
      let card = this.card
      let descriptionEn = this.card.descriptionEn
      let main = this.main
      let mainEn = this.mainEn
      let videos = this.__videos
      let ids = []
      let id = null
      let date = new Date()

      let list = {
        content: [],
        name: 'videos',
        show: {
          sentence: 'Voir le video'
        },
        logo: '/static/img/buttons/header/newspaper-black.png'
      }

      if (title.input.text && video.url.input.text && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        videos.content.forEach(_ => {
          ids.push(Number(_.id))
        })
        id = Math.max(...ids)

        if (id < 0) {
          id = 0
        } else {
          id++
        }

        let item = {
          id: id,
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
          createdAt: date.toString()
        }

        if (this.$i18n.locale === 'en') {
          if (titleEn.input.text) {
            item.title = titleEn.input.text
          }

          if (descriptionEn.input.text) {
            item.card.description = descriptionEn.input.text
          }

          if (mainEn.input.text) {
            item.main = mainEn.input.text
          }
        }

        list.content.push(item)

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
        this.create()
      }

      this.button.click = false
    }
  },
  methods: {
    create () {
      let title = this.title
      let titleEn = this.titleEn
      let video = this.video
      let card = this.card
      let descriptionEn = this.card.descriptionEn
      let main = this.main
      let mainEn = this.mainEn
      let videos = this.__videos
      let ids = []
      let id = null
      let date = new Date()

      if (title.input.text && this.__checkVideoUrl && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        videos.content.forEach(_ => {
          ids.push(Number(_.id))
        })
        id = Math.max(...ids)

        if (id < 0) {
          id = 0
        } else {
          id++
        }

        db.ref(`videos/${id}`).set({
          id: id,
          title: title.input.text,
          titleEn: titleEn.input.text || null,
          video: {
            url: video.url.input.text
          },
          card: {
            description: card.description.input.text,
            descriptionEn: descriptionEn.input.text || null,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
          mainEn: mainEn.input.text || null,
          createdAt: date.toString()
        }).then(_ => {
          this.created = true
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
