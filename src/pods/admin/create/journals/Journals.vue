<template>
  <div class="journals column width">
    <h1 class="title-sentence">Journaux</h1>
    <div class="width column align-center" v-if="!created">
      <basic-input class="margin-20" :input="title.input"/>
      <basic-input class="margin-20" v-for="url in images.urls" :key="url.id" :input="url.input"/>
      <basic-button style="width: 250px" class="margin-20" :button="buttons.moreImage"/>
      <p class="margin-20">*Laisser vide pour ne pas sauvegarder l'image (sauf url n°1).</p>
      <basic-input class="margin-20" :input="card.description.input"/>
      <basic-input class="margin-20" :input="card.miniature.url.input"/>
      <basic-textarea class="margin-20" :textarea="main.input"/>
      <basic-button style="margin: auto" :button="buttons.create"/>
      <h1 class="title-sentence">Aperçu globale</h1>
      <p class="text-center">* L'aperçu est visible une fois l'ensemble des champs remplis *</p>
      <div v-if="__list" class="width column align-center">
        <basic-card-list :list="__list" :noLink="true"/>
        <basic-article style="padding: 70px 0" v-if="__list.content[0]" :article="__list.content[0]"/>
      </div>
    </div>
    <h1 v-else class="text-center">Journal créé !</h1>
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
      images: {
        urls: [
          {
            id: 1,
            input: {
              label: `Url de l'image 1`,
              text: '',
              type: 'text'
            }
          }
        ]
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
      buttons: {
        create: {
          click: false,
          label: 'CREER'
        },
        moreImage: {
          click: false,
          label: 'AJOUTER UNE AUTRE IMAGE'
        }
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
    __journals () {
      return this.$store.state.journals
    },
    __list () {
      let title = this.title
      let images = this.images
      let card = this.card
      let main = this.main
      let journals = this.__journals
      let ids = []
      let id = null
      let date = new Date()

      let list = {
        content: [],
        name: 'journals',
        show: {
          sentence: 'Voir le journal'
        },
        logo: '/static/img/buttons/header/newspaper-black.png'
      }

      if (title.input.text && images.urls[0].input.text && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        journals.content.forEach(_ => {
          ids.push(Number(_.id))
        })
        id = Math.max(...ids)

        if (id < 0) {
          id = 0
        } else {
          id++
        }

        let img = []

        images.urls.forEach(_ => {
          img.push({
            url: _.input.text || null
          })
        })

        list.content.push({
          id: id,
          title: title.input.text,
          images: img,
          card: {
            description: card.description.input.text,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
          createdAt: date.toString()
        })

        return list
      }

      return null
    }
  },
  watch: {
    'buttons.create.click' (click) {
      if (click) {
        this.create()
      }

      this.buttons.create.click = false
    },
    'buttons.moreImage.click' (click) {
      if (click) {
        this.images.urls.push({
          id: this.images.urls.length + 1,
          input: {
            label: `Url de l'image ${this.images.urls.length + 1}`,
            text: '',
            type: 'text'
          }
        })
      }

      this.buttons.moreImage.click = false
    }
  },
  methods: {
    create () {
      let title = this.title
      let images = this.images
      let card = this.card
      let main = this.main
      let journals = this.__journals
      let ids = []
      let id = null
      let date = new Date()

      if (title.input.text && images.urls[0].input.text && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        journals.content.forEach(_ => {
          ids.push(Number(_.id))
        })
        id = Math.max(...ids)

        if (id < 0) {
          id = 0
        } else {
          id++
        }

        let img = []

        images.urls.forEach(_ => {
          img.push({
            url: _.input.text || null
          })
        })

        db.ref(`journals/${id}`).set({
          id: id,
          title: title.input.text,
          images: img,
          card: {
            description: card.description.input.text,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
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
