<template>
  <div class="admin column align-center" :class="{'justi-center': !__admin.uid}">
    <div v-if="!__admin.uid" class="connection column">
      <h1 class="title">Admin - connexion</h1>
      <basic-input :input="connection.password"/>
      <div @click="connect()" class="connection-button row align-center">
        <p class="label">SE CONNECTER</p>
        <img src="/static/img/buttons/basics/left-arrow-white.png" alt="arrow" class="button-img">
      </div>
      <p class="text-center" v-if="connection.try">Un instant...</p>
      <p class="text-center color-red" v-if="connection.password.wrong">Mauvais mot de passe</p>
      <p class="text-center color-red" v-if="connection.manyRequests">Patientez avant de réessayer</p>
    </div>
    <div v-else class="column width align-center">
      <div @click="disconnect()" class="disconnect-button">
        <p class="label">SE DECONNECTER</p>
      </div>
      <div class="align-center" :class="[__window.width <= 900 ? 'column' : 'row']">
        <basic-dropdown class="margin-10" :dropdown="__admin.filters.action"/>
        <basic-dropdown class="margin-10" :dropdown="__admin.filters.media"/>
        <basic-link-button class="margin-10" style="width: 270px" :button="comments.button"/>
      </div>
      <router-view/>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      connection: {
        manyRequests: false,
        try: false,
        password: {
          wrong: false,
          text: '',
          label: 'Mot de passe',
          type: 'password'
        }
      },
      comments: {
        button: {
          label: 'GERER LES COMMENTAIRES',
          path: '/admin/comments',
          logo: '/static/img/buttons/basics/blogging-white.png'
        }
      }
    }
  },
  mounted () {
    let fullPath = this.$route.fullPath
    let action = this.$store.state.admin.filters.action
    let media = this.$store.state.admin.filters.media

    if (fullPath.indexOf('create') !== -1) {
      action.selected = 1
    } else if (fullPath.indexOf('modif') !== -1) {
      action.selected = 2
    } else if (fullPath.indexOf('delete') !== -1) {
      action.selected = 3
    }

    if (fullPath.indexOf('journals') !== -1) {
      media.selected = 1
    } else if (fullPath.indexOf('news') !== -1) {
      media.selected = 2
    } else if (fullPath.indexOf('videos') !== -1) {
      media.selected = 3
    }

    this.toRoute()
  },
  computed: {
    __window () {
      return this.$store.state.window
    },
    __admin () {
      return this.$store.state.admin
    }
  },
  watch: {
    '__admin.filters.action.selected' () {
      this.toRoute()
    },
    '__admin.filters.media.selected' () {
      this.toRoute()
    },
    'connection.password.text' () {
      this.connection.password.wrong = false
    }
  },
  methods: {
    connect () {
      let connection = this.connection
      let password = connection.password

      firebase.auth().signInWithEmailAndPassword('admin@js2-sciences.com', password.text).catch(error => {
        connection.try = false
        if (error.code === 'auth/wrong-password') {
          password.wrong = true
        }
        if (error.code === 'auth/too-many-requests') {
          connection.manyRequests = true
        }
      }).then(() => {
        this.connection.try = false
      })
    },
    disconnect () {
      firebase.auth().signOut()
    },
    toRoute () {
      let action = this.__admin.filters.action
      let media = this.__admin.filters.media

      if (action.selected && media.selected) {
        this.$router.push(`/admin/${action.content[action.selected - 1].value}/${media.content[media.selected - 1].value}`)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
