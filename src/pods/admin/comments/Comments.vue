<template>
  <div class="comments column width align-center">
    <h1 class="title-sentence">Commentaires{{!empty && !fetching ? ` - (${__totalLength})` : ''}}</h1>
    <basic-dropdown class="margin-20" :dropdown="filters.show"/>
    <h1 v-if="empty" class="text-center">Aucun commentaire</h1>
    <h1 v-if="fetching" class="text-center">Un instant...</h1>
    <router-view v-if="messages" :messages="messages"/>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  data () {
    return {
      messages: null,
      empty: false,
      fetching: false,
      filters: {
        show: {
          label: 'AFFICHER',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'TOUS',
              value: 'all'
            },
            {
              id: 2,
              name: 'NOUVEAUX',
              value: 'new'
            },
            {
              id: 3,
              name: 'NON VALIDE',
              value: 'unvalid'
            }
          ]
        }
      }
    }
  },
  created () {
    this.fetching = true
    db.ref('messages').on('value', snap => {
      this.fetching = false

      if (snap.val()) {
        this.empty = false

        let messages = {
          journals: snap.val().journals || [],
          news: snap.val().news || [],
          videos: snap.val().videos || []
        }

        for (let index in messages) {
          let a = messages[index]

          for (let index in a) {
            let ms = a[index]
            let final = []

            for (let index in ms) {
              let m = ms[index]

              if (m) {
                final.push(m)
              }
            }

            a[index] = final
          }
        }

        this.messages = messages
      } else {
        this.empty = true
        this.messages = null
      }
    })
  },
  computed: {
    __totalLength () {
      let messages = this.messages

      if (messages) {
        let length = 0

        length += this.lengthMessages(messages.journals)
        length += this.lengthMessages(messages.news)
        length += this.lengthMessages(messages.videos)

        return length
      }

      return 0
    }
  },
  watch: {
    'filters.show.selected' () {
      this.toRoute()
    }
  },
  methods: {
    toRoute () {
      let show = this.filters.show

      if (show) {
        this.$router.push(`/admin/comments/${show.content[show.selected - 1].value}`)
      }
    },
    lengthMessages (base) {
      let l = 0

      for (let index in base) {
        let m = base[index]

        m.forEach(_ => {
          l++
        })
      }

      return l
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
