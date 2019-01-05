<template>
  <div v-if="__journal" class="edit-journal column width">
    <h1 class="title-sentence">Journal - {{__journal.title}}</h1>
    <div @click="$router.go(-1)" class="back row align-center">
      <img class="back-arrow" src="/static/img/buttons/basics/left-arrow-white.png" alt="ARROW">
      <p class="back-label">{{$t('back')}}</p>
    </div>
    <div class="width column align-center" v-if="!modified">
      <basic-input class="margin-20" :input="title.input"/>
      <basic-input class="margin-20" :input="titleEn.input"/>
      <basic-input class="margin-20" v-for="url in images.urls" :key="url.id" :input="url.input"/>
      <basic-button style="width: 250px" class="margin-20" :button="buttons.moreImage"/>
      <p class="margin-20">*Laisser vide pour ne pas sauvegarder l'image (sauf url n°1).</p>
      <basic-input class="margin-20" :input="card.description.input"/>
      <basic-input class="margin-20" :input="card.descriptionEn.input"/>
      <basic-input class="margin-20" :input="card.miniature.url.input"/>
      <basic-textarea class="margin-20" :textarea="main.input"/>
      <basic-textarea class="margin-20" :textarea="mainEn.input"/>
      <basic-button style="margin: auto" :button="buttons.create"/>
      <h1 class="title-sentence">Aperçu globale</h1>
      <p class="text-center">* L'aperçu est visible une fois l'ensemble des champs remplis (sauf anglais) *</p>
      <p class="text-center">* S'il n'y a pas de texte en anglais, le texte en français sera pris par défaut *</p>
      <div v-if="__list" class="width column align-center">
        <basic-card-list :list="__list" :noLink="true"/>
        <basic-article style="padding: 70px 0;" v-if="__list.content[0]" :article="__list.content[0]"/>
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
      titleEn: {
        input: {
          label: 'Titre - Anglais',
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
      buttons: {
        create: {
          click: false,
          label: 'MODIFIER'
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
    __journal () {
      let journal = this.$store.state.journals.content.find(_ => _.id === Number(this.$route.params.id)) || null
      let images = this.images

      if (journal && !this.title.input.text) {
        this.title.input.text = journal.title
        this.titleEn.input.text = journal.titleEn
        this.card.description.input.text = journal.card.description
        this.card.descriptionEn.input.text = journal.card.descriptionEn
        this.card.miniature.url.input.text = journal.card.miniature.url
        this.main.input.text = journal.main
        this.mainEn.input.text = journal.mainEn

        images.urls = []

        journal.images.forEach((_, index) => {
          if (!index) {
            images.urls[0] = {
              id: 1,
              input: {
                label: `Url de l'image 1`,
                text: _.url,
                type: 'text'
              }
            }
          } else {
            images.urls.push({
              id: index + 1,
              input: {
                label: `Url de l'image ${index + 1}`,
                text: _.url,
                type: 'text'
              }
            })
          }
        })
      }

      return journal
    },
    __list () {
      let title = this.title
      let titleEn = this.titleEn
      let images = this.images
      let card = this.card
      let descriptionEn = this.card.descriptionEn
      let main = this.main
      let mainEn = this.mainEn
      let journals = this.__journals
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
        let img = []

        images.urls.forEach(_ => {
          img.push({
            url: _.input.text || null
          })
        })

        let item = {
          id: this.__journal.id,
          title: title.input.text,
          images: img,
          card: {
            description: card.description.input.text,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
          createdAt: this.__journal.createdAt,
          modified: date.toString()
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
    }
  },
  watch: {
    'buttons.create.click' (click) {
      if (click) {
        this.modif()
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
    modif () {
      let title = this.title
      let titleEn = this.titleEn
      let images = this.images
      let card = this.card
      let descriptionEn = this.card.descriptionEn
      let main = this.main
      let mainEn = this.mainEn
      let journals = this.__journals
      let date = new Date()

      if (title.input.text && images.urls[0].input.text && card.description.input.text && card.miniature.url.input.text && main.input.text) {
        let img = []

        images.urls.forEach(_ => {
          img.push({
            url: _.input.text || null
          })
        })

        db.ref(`journals/${this.__journal.id}`).update({
          title: title.input.text,
          titleEn: titleEn.input.text || null,
          images: img,
          card: {
            description: card.description.input.text,
            descriptionEn: descriptionEn.input.text || null,
            miniature: {
              url: card.miniature.url.input.text
            }
          },
          main: main.input.text,
          mainEn: mainEn.input.text || null,
          modifiedAt: date.toString()
        }).then(_ => {
          this.modified = true
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
