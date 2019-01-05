<template>
  <div class="basic-message row">
    <div class="message-infos column">
      <p class="name">{{message.name}}</p>
      <p class="date">{{message.createdAt | moment("Do MMMM YYYY à H:mm")}}</p>
    </div>
    <div class="message">
      <div v-if="__admin.uid" class="admin-buttons row width">
        <p v-if="!remove.show">
          <span style="color: lightgreen" v-if="message.new">New !</span>
          <span v-if="message.new"> - </span>
          <span class="pointer" @click="validating(message, false)" v-if="message.validated">Désapprouver</span>
          <span class="pointer" @click="validating(message, true)"  v-else>Approuver</span>
          <span> / </span>
          <span class="pointer" @click="remove.show = true">Supprimer</span>
        </p>
        <p v-else>
          <span>Êtes-vous sûr ? </span>
          <span class="pointer" @click="removeMessage(message)">Oui</span>
          <span> / </span>
          <span class="pointer" @click="remove.show = false">Non</span>
        </p>
      </div>
      <p>{{message.content}}</p>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  props: ['message', 'from', 'id'],
  data () {
    return {
      remove: {
        show: false
      }
    }
  },
  computed: {
    __admin () {
      return this.$store.state.admin
    }
  },
  methods: {
    removeMessage (message) {
      db.ref(`messages/${this.from}/${this.id}/${message.id}`).set(null)
    },
    validating (message, validated) {
      db.ref(`messages/${this.from}/${this.id}/${message.id}`).update({
        new: false,
        validated: validated
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
