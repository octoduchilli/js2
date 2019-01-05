<template>
  <div v-if="list" class="delete-card-list column align-center">
    <div class="align-center" v-for="card in __list" :key="card.id" :style="{'margin-bottom': __window.width <= 900 ? '70px' : null}" :class="[__window.width <= 900 ? 'column' : 'row']">
      <router-link tag="div" class="card row link" :to="{ path:`/${list.name}/${card.id}`}">
        <div class="card-image">
          <img class="miniature-image" :src="card.card.miniature.url" alt="Image" onerror="this.onerror=null; this.src='/static/img/logo/base.png';">
          <img class="card-logo unselectable" :src="list.logo" alt="card">
        </div>
        <div class="column">
          <h2 class="card-title">{{card.title}}</h2>
          <p class="card-date">{{card.createdAt | moment("Do MMMM YYYY - H:mm:ss")}}</p>
          <p class="card-sentence">{{card.card.description}}</p>
        </div>
        <p class="show-sentence unselectable">{{$t(list.show.sentence)}}</p>
      </router-link>
      <ul v-if="card.remove" class="button-list basic-list" :class="[__window.width <= 900 ? 'row' : 'column']">
        <li v-if="!card.remove.show" @click="showRemove(card, true)" class="button red">
          <img class="button-img" src="/static/img/buttons/basics/garbage-white.png" alt="Trash">
        </li>
        <li v-if="card.remove.show" @click="remove(card)" class="button green">
          <img class="button-img" src="/static/img/buttons/basics/checked-white.png" alt="Check">
        </li>
        <li v-if="card.remove.show" @click="showRemove(card, false)" class="button red">
          <img class="button-img" src="/static/img/buttons/basics/cancel-white.png" alt="Cancel">
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  props: ['list'],
  computed: {
    __window () {
      return this.$store.state.window
    },
    __list () {
      let list = JSON.parse(JSON.stringify(this.list))

      list.content.forEach(_ => {
        _.remove = {
          show: false
        }
      })

      if (this.$i18n.locale !== 'en') {
        return list.content
      } else {
        return list.content.map(card => {
          let copy = {}

          for (let i in card) {
            copy[i] = card[i]
          }

          if (copy.titleEn) {
            copy.title = copy.titleEn
          }

          if (copy.card.descriptionEn) {
            copy.card.description = copy.card.descriptionEn
          }

          return copy
        })
      }
    }
  },
  methods: {
    showRemove (card, value) {
      card.remove.show = value

      this.$forceUpdate()
    },
    remove (card) {
      let list = this.list

      db.ref(`${list.name}/${card.id}`).set(null)
      db.ref(`messages/${list.name}/${card.id}`).set(null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
