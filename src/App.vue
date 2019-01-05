<template>
  <div id="app">
    <header class="main-header width row animated" :class="[header.position === 'absolute' ? header.class.absolute : header.class.fixed]">
      <nav v-if="__window.width > 900" class="main-nav width row">
        <router-link v-show="header.position === 'fixed'" class="link" to="/">
          <img class="logo" src="/static/img/logo/no-bg.png">
        </router-link>
        <ul class="nav-links basic-list row width justi-around align-center">
          <li @click="$store.state.route.selected = 0" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 0}" to="/">ACCUEIL</router-link>
          </li>
          <li @click="$store.state.route.selected = 1" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 1}" to="/journals">JOURNAL</router-link>
          </li>
          <li @click="$store.state.route.selected = 2" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 2}" to="/news">ACTUALITES</router-link>
          </li>
          <li @click="$store.state.route.selected = 3" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 3}" to="/videos">VIDEOS</router-link>
          </li>
          <li @click="$store.state.route.selected = 4" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 4}" to="/about">A PROPOS</router-link>
          </li>
          <li @click="$store.state.route.selected = 5" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 5}" to="/contact">CONTACT</router-link>
          </li>
        </ul>
      </nav>
      <nav v-else class="main-nav width row">
        <ul class="nav-links basic-list row width justi-around align-center">
          <li @click="$store.state.route.selected = 0" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 0}" to="/"><img class="link-img" src="/static/img/buttons/header/home-black.png" alt="ACCUEIL"></router-link>
          </li>
          <li @click="$store.state.route.selected = 1" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 1}" to="/journals"><img class="link-img" src="/static/img/buttons/header/newspaper-black.png" alt="JOURNAL"></router-link>
          </li>
          <li @click="$store.state.route.selected = 2" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 2}" to="/news"><img class="link-img" src="/static/img/buttons/header/news-black.png" alt="ACTUALITES"></router-link>
          </li>
          <li @click="$store.state.route.selected = 3" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 3}" to="/videos"><img class="link-img" src="/static/img/buttons/header/play-black.png" alt="VIDEOS"></router-link>
          </li>
          <li @click="$store.state.route.selected = 4" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 4}" to="/about"><img class="link-img" src="/static/img/buttons/header/visitor-black.png" alt="A PROPOS"></router-link>
          </li>
          <li @click="$store.state.route.selected = 5" class="nav-link">
            <router-link class="link" :class="{'link-active': __route.selected === 5}" to="/contact"><img class="link-img" src="/static/img/buttons/header/letter-black.png" alt="CONTACT"></router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view/>
    <footer class="main-footer row">
      <a href="https://www.linkedin.com/in/josselin-ada/" class="link row align-center text-center">
        <img src="/static/img/buttons/basics/linkedin.png" alt="Linkedin">
        <img src="/static/img/buttons/basics/seo-white.png" alt=" ">
        <p>Developed & Designed by Josselin ADA</p>
      </a>
    </footer>
  </div>
</template>

<script>
import { db } from '@/firebase'
import firebase from 'firebase'

export default {
  data () {
    return {
      header: {
        position: 'absolute',
        class: {
          absolute: 'fadeIn absolute-header no-background',
          fixed: 'fadeInDown fixed-header'
        }
      }
    }
  },
  mounted () {
    this.$store.state.window.height = window.innerHeight
    this.$store.state.window.width = window.innerWidth
    this.$store.state.window.scrollY = window.scrollY

    this.$store.state.body.height = document.body.clientHeight
    this.$store.state.body.width = document.body.clientWidth

    window.addEventListener('resize', event => {
      this.$store.state.window.height = window.innerHeight
      this.$store.state.window.width = window.innerWidth
      this.$store.state.window.scrollY = window.scrollY

      this.$store.state.body.height = document.body.clientHeight
      this.$store.state.body.width = document.body.clientWidth
    })

    window.addEventListener('scroll', event => {
      this.$store.state.window.scrollY = window.scrollY
      this.$store.state.body.height = document.body.clientHeight
      this.$store.state.body.width = document.body.clientWidth

      if (this.$route.fullPath === '/') {
        this.checkPositionHeader()
      }
    })

    this.checkRoute(this.$route)

    db.ref('journals').on('value', snap => {
      let final = []

      for (var index in snap.val()) {
        var attr = snap.val()[index]
        final.push(attr)
      }

      final.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      this.$store.state.journals.content = final
    })

    db.ref('news').on('value', snap => {
      let final = []

      for (var index in snap.val()) {
        var attr = snap.val()[index]
        final.push(attr)
      }

      final.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      this.$store.state.news.content = final
    })

    db.ref('videos').on('value', snap => {
      let final = []

      for (var index in snap.val()) {
        var attr = snap.val()[index]
        final.push(attr)
      }

      final.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
      })

      this.$store.state.videos.content = final
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.state.admin.uid = user.uid
      } else {
        this.$store.state.admin.uid = null
      }
    })
  },
  computed: {
    __window () {
      return this.$store.state.window
    },
    __route () {
      return this.$store.state.route
    }
  },
  watch: {
    '$route' (route) {
      this.checkRoute(route)
    }
  },
  methods: {
    checkRoute (route) {
      let header = this.header

      if (route.fullPath !== '/') {
        header.position = 'fixed'
      } else {
        this.checkPositionHeader()
      }
    },
    checkPositionHeader () {
      let window = this.__window
      let header = this.header

      let headerHeight = 70

      if (window.scrollY + headerHeight >= window.height / 2) {
        header.position = 'fixed'
      } else {
        header.position = 'absolute'
      }
    }
  }
}
</script>

<style lang="scss">
  @import 'static/scss/animate.scss';
  @import 'static/scss/base.scss';

  .main-header {
    font-family: 'Viga', sans-serif;

    height: 70px;

    z-index: 9999;

    background: linear-gradient(to bottom, rgba(250, 250, 250, 1), rgba(250, 250, 250, .8));

    .logo {
      width: 50px;
      height: 50px;

      margin: 5px 20px;

      transition: 0.5s ease;

      &:hover {
        transform: scale(1.2);
      }
    }

    .main-nav {
      height: 100%;

      .nav-links {
        height: 100%;

        .nav-link {
          height: 100%;

          .link {
            height: calc(100% - 5px);

            display: flex;
            justify-content: center;
            align-items: center;

            padding: 0 15px;

            transition: .5s ease;

            letter-spacing: 3px;

            border-bottom: 5px solid var(--black50);

            &:hover {
              color: var(--creme);

              background: var(--black50);
            }

            &:hover .link-img {
              filter: invert(100%);
            }

            .link-img {
              height: 50px;
              width: 50px;

              transition: .5s ease;
            }
          }

          .link-active {
            transform:  scale(1.2) rotate(-3deg);

            background: var(--black50);

            color: var(--creme);

            .link-img {
              filter: invert(100%);
            }
          }
        }
      }
    }
  }

  .absolute-header {
    position: absolute;
    top: calc(50vh - 60px);
    left: 0;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    left: 0;
  }

  .main-footer {
    margin-top: 150px;

    width: 100%;

    justify-content: flex-end;

    background: var(--black40);

    a {
      font-family: 'Viga', sans-serif;

      color: var(--creme);

      margin-right: 10px;

      transition: .5s ease;

      opacity: .5;

      &:hover {
        opacity: 1;
      }

      img {
        width: 25px;
        height: 25px;

        margin: 5px
      }
    }
  }

  @media (max-width: 700px) {
    .main-header {

      .main-nav {

        .nav-links {

          .nav-link {

            .link {
              padding: 0 8px;

              .link-img {
                height: 30px;
                width: 30px;
              }
            }
          }
        }
      }
    }
  }
</style>
