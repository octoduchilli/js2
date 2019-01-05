<template>
  <div class="contact column">
    <div :class="[__window.width <= 900 ? 'column' : 'row']">
      <ul class="social-list basic-list column justi-center align-center">
        <li class="social">
          <a href="https://www.linkedin.com/company/je-science-donc-je-suis/" target="_blank" class="link row justi-center align-center">
            <img src="/static/img/buttons/basics/linkedin.png" alt="Linkedin" class="link-img">
            @Linkedin
          </a>
        </li>
        <li class="social">
          <a href="https://www.facebook.com/jesciencedoncjesuis/?fb_dtsg_ag=AdzvoR6Kf2I3u46F1MLaQlAwwOQ_TCgwEFP4o69HgCpqzA%3AAdwHjoEm5b7TvjhblN05ykzxvotCIixJqTOepfbrjj3eGw" target="_blank" class="link row justi-center align-center">
            <img src="/static/img/buttons/basics/facebook.png" alt="Facebook" class="link-img">
            @Facebook
          </a>
        </li>
        <li class="social">
          <a href="https://www.youtube.com/channel/UCQELK7ORi0Xd6M_H7N0r9eQ" target="_blank" class="link row justi-center align-center">
            <img src="/static/img/buttons/basics/youtube.png" alt="YouTube" class="link-img">
            @YouTube
          </a>
        </li>
        <li class="social">
          <a href="https://twitter.com/JeScience" target="_blank" class="link row justi-center align-center">
            <img src="/static/img/buttons/basics/twitter.png" alt="Twitter" class="link-img">
            @Twitter
          </a>
        </li>
        <li class="social">
          <a href="https://www.instagram.com/jesciencedoncjesuis/?utm_source=ig_profile_share&igshid=hbytnnr24d1g" target="_blank" class="link row justi-center align-center">
            <img src="/static/img/buttons/basics/instagram.png" alt="Instagram" class="link-img">
            @Instagram
          </a>
        </li>
        <li style="margin-top: 75px" class="social">
          <div class="link row justi-center align-center">
            <img src="/static/img/buttons/basics/email.png" alt="Instagram" class="link-img">
            contact@js2-sciences.com
          </div>
        </li>
      </ul>
      <div v-if="!send" class="mail-form column" :class="[__window.width <= 900 ? 'align-center' : null]">
        <h1 class="margin-20">Nous envoyer un mail</h1>
        <basic-input class="margin-20" :input="mail.firstname.input"/>
        <basic-input class="margin-20" :input="mail.lastname.input"/>
        <basic-input class="margin-20" :input="mail.email.input"/>
        <basic-input class="margin-20" :input="mail.subject.input"/>
        <basic-textarea class="margin-20" :textarea="mail.main.input" rows="20" cols="30"/>
        <basic-button class="margin-20" :style="{'opacity': __checkInput ? '1' : '.3'}" :button="button"/>
      </div>
      <h1 v-else class="margin-20 flex justi-center align-center text-center animated fadeInRight">Votre message a bien été envoyé !</h1>
    </div>
    <router-link class="link-admin link row align-center" to="/admin">
      <img src="/static/img/buttons/basics/admin-black.png" alt="Admin" class="link-img">
      <p>admin</p>
    </router-link>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  data () {
    return {
      send: false,
      mail: {
        firstname: {
          input: {
            id: 'firstname',
            label: 'Nom *',
            text: '',
            type: 'text'
          }
        },
        lastname: {
          input: {
            id: 'lastname',
            label: 'Prénom *',
            text: '',
            type: 'text'
          }
        },
        email: {
          input: {
            id: 'email',
            label: 'Email *',
            text: '',
            type: 'text'
          }
        },
        subject: {
          input: {
            id: 'subject',
            label: 'Sujet *',
            text: '',
            type: 'text'
          }
        },
        main: {
          input: {
            id: 'main',
            label: 'Votre message *',
            text: ''
          }
        }
      },
      button: {
        id: 'validate',
        click: false,
        label: 'ENVOYER'
      }
    }
  },
  created () {
    this.$store.state.route.selected = 5
    db.ref('mail').once('value', snap => {
      this.mail.apikey = snap.val().apikey
    })
  },
  destroyed () {
    window.scroll({
      top: 0,
      left:0,
      behavior: 'auto'
    })
  },
  watch: {
    'button.click' (click) {
      if (click && this.__checkInput) {
        this.sendMail()
      }
      this.button.click = false
    }
  },
  computed: {
    __window () {
      return this.$store.state.window
    },
    __checkInput () {
      let mail = this.mail

      for (let index in mail) {
        if (!mail[index].input.text) {
          return false
        }
      }

      return true
    }
  },
  methods: {
    sendMail () {
      let formData = new FormData()
      let mail = this.mail
      formData.append('mail', mail.email.input.text)
      formData.append('name', `${mail.firstname.input.text.toUpperCase()} ${mail.lastname.input.text.toLowerCase()}`)
      formData.append('sujet', mail.subject.input.text)
      formData.append('main', mail.main.input.text)
      this.axios.post('../../static/php/mail.php', formData).then(_ => {
        this.send = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
