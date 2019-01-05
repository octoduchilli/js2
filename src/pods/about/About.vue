<template>
  <div class="about column align-center">
    <h1 class="title-sentence text-center animated fadeIn">{{$t('about.title')}}</h1>
    <img class="banner-img text-center animated fadeInLeft" src="/static/img/membres/group-min.jpeg" alt="PHOTO DE GROUPE">
    <div class="main-content" :class="[__window.width <= 900 ? 'column' : 'row']">
      <div class="history">
        <div class="border-top"></div>
        <div class="border-bottom"></div>
        <h1 class="title-sentence">{{$t('about.history.title')}}</h1>
        <p class="normal-sentence" v-html="$t('about.history.content')"></p>
      </div>
      <div class="column align-center width" v-if="__window.width <= 900">
        <h1 class="text-center">{{$t('about.members')}}</h1>
        <ul class="membres basic-list wrap justi-center width">
          <li class="membre column align-center justi-around" v-for="membre in membres" :key="membre.id">
            <img class="img" :src="membre.path">
            <div class="sentences">
              <p style="font-weight: bold; font-size: 18px">{{membre.title}}</p>
              <p>{{$t(`about.${membre.name.replace(/-/g, '_')}.infos_1`)}}</p>
              <p>{{$t(`about.${membre.name.replace(/-/g, '_')}.infos_2`)}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="projects border-top border-bottom">
        <div class="border-top"></div>
        <div class="border-bottom"></div>
        <h1 class="title-sentence">{{$t('about.project.title')}}</h1>
        <h2 class="title-sentence">{{$t('about.project.little_title_1')}}</h2>
        <p class="normal-sentence" v-html="$t('about.project.little_content_1')"></p>
        <h2 class="title-sentence">{{$t('about.project.little_title_2')}}</h2>
        <p class="normal-sentence" v-html="$t('about.project.little_content_2')">À court terme vous allez pouvoir découvrir nos vidéos qui auront pour but soit de montrer des projets étudiants soit de vous apprendre de nouveaux concepts en tout genre mais… on ne vous en dit pas plus pour l’instant ;). À plus long ou moyen terme nous souhaiterions organiser des conférences interactives à Paris ou ailleurs.</p>
      </div>
    </div>
    <div class="column align-center width" v-if="__window.width > 900">
      <h1 class="text-center">{{$t('about.members')}}</h1>
      <ul class="membres basic-list wrap justi-center width">
        <li class="membre column align-center justi-around" v-for="membre in membres" :key="membre.name">
          <img class="img" :src="membre.path">
          <div class="sentences">
            <p style="font-weight: bold; font-size: 18px">{{membre.title}}</p>
            <p>{{$t(`about.${membre.name.replace(/-/g, '_')}.infos_1`)}}</p>
            <p>{{$t(`about.${membre.name.replace(/-/g, '_')}.infos_2`)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      membres: [
        {
          name: 'sophia-richard',
          title: 'Sophia Richard',
          path: '/static/img/membres/SophiaRichard.jpeg'
        },
        {
          name: 'sofia-rigou',
          title: 'Sofia Rigou',
          path: '/static/img/membres/SofiaRigou.jpeg'
        },
        {
          name: 'hassiba-gourou',
          title: 'Hassiba Gourou',
          path: '/static/img/membres/HassibaGourou.jpeg'
        },
        {
          name: 'fabienne-deou',
          title: 'Fabienne Deou',
          path: '/static/img/membres/FabienneDeou.jpeg'
        },
        {
          name: 'hafsa-salka',
          title: 'Hafsa Salka',
          path: '/static/img/membres/HafsaSalka.jpeg'
        },
        {
          name: 'ikram-chahmi-gheidene',
          title: 'Ikram Chahmi-Gheidene',
          path: '/static/img/membres/IkramChahmiGheidene.jpeg'
        },
        {
          name: 'anna-marie-montijano',
          title: 'Anna-Marie Montijano',
          path: '/static/img/membres/Anna-MarieMontijano.jpeg'
        },
        {
          name: 'oscar-node-langlois',
          title: 'Oscar Nodé-Langlois',
          path: '/static/img/membres/OscarNodeLanglois.jpeg'
        },
        {
          name: 'jean-baptiste-vasset',
          title: 'Jean-Baptiste Vasset',
          path: '/static/img/membres/JeanBaptisteVasset.jpeg'
        },
        {
          name: 'monika-kociolek',
          title: 'Monika Kociolek',
          path: '/static/img/membres/MonikaKociolek.jpeg'
        },
        {
          name: 'maheva-andriatsilavo',
          title: 'Maheva Andriatsilavo',
          path: '/static/img/membres/MahevaAndria.jpeg'
        },
        {
          name: 'mounir-belkouch',
          title: 'Mounir Belkouch',
          path: '/static/img/membres/MounirBelkouch.jpeg'
        },
        {
          name: 'sophie-malaquin',
          title: 'Sophie Malaquin',
          path: '/static/img/membres/SophieMalaquin.jpeg'
        },
        {
          name: 'alice-zhang',
          title: 'Alice Zhang',
          path: '/static/img/membres/AliceZhang.jpeg'
        }
      ]
    }
  },
  created () {
    this.$store.state.route.selected = 4
  },
  computed: {
    __window () {
      return this.$store.state.window
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
