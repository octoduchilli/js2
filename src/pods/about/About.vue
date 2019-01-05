<template>
  <div class="about column align-center">
    <h1 class="title-sentence text-center animated fadeIn">Mais qui sommes-nous ?</h1>
    <img class="banner-img text-center animated fadeInLeft" src="/static/img/membres/group-min.jpeg" alt="PHOTO DE GROUPE">
    <div class="main-content" :class="[__window.width <= 900 ? 'column' : 'row']">
      <div class="history">
        <div class="border-top"></div>
        <div class="border-bottom"></div>
        <h1 class="title-sentence">Notre histoire</h1>
        <p class="normal-sentence">L’association est née en décembre 2017 d’une envie que nous avions de vulgariser les sciences en utilisant les connaissances de chacun. La principale motivation était d’animer une curiosité chez les étudiants avant tout envers la recherche, ses applications et envers de nouvelles disciplines. En premier lieu nous voulions attirer l’attention vers les recherches qui se font au sein même de notre université pour créer un pont entre étudiants et chercheur. Depuis peu, nous avons décidé de dépasser les limites de notre université pour nous adresser à tous les étudiants et personnes intéressées par les sciences en général. Notre équipe actuelle est très diversifiée, et c’est ce qui fera sûrement notre force cette année. Nous avons décidé d’ouvrir ce site, pour vous partager tous nos projets, diffuser notre journal et nos vidéos à l’échelle internationale.</p>
      </div>
      <div class="column align-center width" v-if="__window.width <= 900">
        <h1 class="text-center">Membres de JS²</h1>
        <ul class="membres basic-list wrap justi-center width">
          <li class="membre column align-center justi-around" v-for="membre in membres" :key="membre.id">
            <img class="img" :src="membre.path">
            <div class="sentences" v-html="membre.sentence"></div>
          </li>
        </ul>
      </div>
      <div class="projects border-top border-bottom">
        <div class="border-top"></div>
        <div class="border-bottom"></div>
        <h1 class="title-sentence">Nos projets</h1>
        <h2 class="title-sentence">Le journal</h2>
        <p class="normal-sentence">Notre tout premier projet, et pas le moins important, est le journal “JS² Le Journal - Je Science donc J’écris”. Notre équipe rédactionnelle était très pluridisciplinaire. Nous avons sorti trois numéros de ce journal que vous pourrez retrouver dans la rubrique Journal. Cette année nous continuons l’aventure avec une équipe de rédaction motivée et venant de plusieur villes en France et en Europe.</p>
        <h2 class="title-sentence">Projets à venir</h2>
        <p class="normal-sentence">À court terme vous allez pouvoir découvrir nos vidéos qui auront pour but soit de montrer des projets étudiants soit de vous apprendre de nouveaux concepts en tout genre mais… on ne vous en dit pas plus pour l’instant ;). À plus long ou moyen terme nous souhaiterions organiser des conférences interactives à Paris ou ailleurs.</p>
        <p class="normal-sentence">Nous faisons de notre meilleur pour essayer de vous offrir un contenu de qualité et non superficiel. Nous espérons pouvoir continuer à vous apprendre des choses voir à vous surprendre dans nos réalisations futures car c’est là tout le but de notre existence.</p>
      </div>
    </div>
    <div class="column align-center width" v-if="__window.width > 900">
      <h1 class="text-center">Membres de JS²</h1>
      <ul class="membres basic-list wrap justi-center width">
        <li class="membre column align-center justi-around" v-for="membre in membres" :key="membre.name">
          <img class="img" :src="membre.path">
          <div class="sentences" v-html="membre.sentence"></div>
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
          sentence: '<p style="font-weight: bold; font-size: 18px">Sophia Richard</p><p>Présidente - Co-fondatrice</p><p>Césure (M2 Neurosciences)</p>',
          path: '/static/img/membres/SophiaRichard.jpeg'
        },
        {
          name: 'sophia-rigou',
          sentence: '<p style="font-weight: bold; font-size: 18px">Sofia Rigou</p><p>Membre Associée Co-fondatrice</p><p>M2 Bioressources Marines</p>',
          path: '/static/img/membres/SofiaRigou.jpeg'
        },
        {
          name: 'hassiba-gourou',
          sentence: '<p style="font-weight: bold; font-size: 18px">Hassiba Gourou</p><p>Trésorière</p><p>Etudiante en licence de maths-informatique à Sorbonne Université</p>',
          path: '/static/img/membres/HassibaGourou.jpeg'
        },
        {
          name: 'fabienne-deou',
          sentence: '<p style="font-weight: bold; font-size: 18px">Fabienne Deou</p><p>Co-Directrice Communication</p><p>M2 Nutrition Qualité Santé</p>',
          path: '/static/img/membres/FabienneDeou.jpeg'
        },
        {
          name: 'hafsa-salka',
          sentence: '<p style="font-weight: bold; font-size: 18px">Hafsa Salka</p><p>Co-Directrice Communication</p><p>UPEC - LLCER Anglais</p>',
          path: '/static/img/membres/HafsaSalka.jpeg'
        },
        {
          name: 'ikram-chahmi-gheidene',
          sentence: '<p style="font-weight: bold; font-size: 18px">Ikram Chahmi-Gheidene</p><p>Chargée de Communication</p><p>M2 Biologie et Pharmacologie du vieillissement</p>',
          path: '/static/img/membres/IkramChahmiGheidene.jpeg'
        },
        {
          name: 'anna-marie-montijano',
          sentence: '<p style="font-weight: bold; font-size: 18px">Anna-Marie Montijano</p><p>Éditrice</p><p>Master Communication et Culture Scientifiques et Techniques</p>',
          path: '/static/img/membres/Anna-MarieMontijano.jpeg'
        },
        {
          name: 'oscar-node-langlois',
          sentence: '<p style="font-weight: bold; font-size: 18px">Oscar Nodé-Langlois</p><p>Illustrateur</p><p>M2 Neurosciences</p>',
          path: '/static/img/membres/OscarNodeLanglois.jpeg'
        },
        {
          name: 'jean-baptiste-vasset',
          sentence: '<p style="font-weight: bold; font-size: 18px">Jean-Baptiste Vasset</p><p>Rédacteur</p><p>Ecole des Hautes Etudes en Santé Publique</p>',
          path: '/static/img/membres/JeanBaptisteVasset.jpeg'
        },
        {
          name: 'monika-kociolek',
          sentence: '<p style="font-weight: bold; font-size: 18px">Monika Kociolek</p><p>Rédactrice</p><p>Etudiante en médecine à Paris Diderot</p>',
          path: '/static/img/membres/MonikaKociolek.jpeg'
        },
        {
          name: 'maheva-andria',
          sentence: '<p style="font-weight: bold; font-size: 18px">Maheva Andriatsilavo</p><p>Rédactrice</p><p>Post-doctorante en Neurologie du Développement à Berlin</p>',
          path: '/static/img/membres/MahevaAndria.jpeg'
        },
        {
          name: 'mounir-belkouch',
          sentence: '<p style="font-weight: bold; font-size: 18px">Mounir Belkouch</p><p>Rédacteur</p><p>Rédacteur en Nutrition - post-doctorant à Compiègne</p>',
          path: '/static/img/membres/MounirBelkouch.jpeg'
        },
        {
          name: 'sophie-malaquin',
          sentence: '<p style="font-weight: bold; font-size: 18px">Sophie Malaquin</p><p>Rédactrice en physique</p><p>Étudiante en M2 à l\'Ecole Normale Supérieure</p>',
          path: '/static/img/membres/SophieMalaquin.jpeg'
        },
        {
          name: 'alice-zhang',
          sentence: '<p style="font-weight: bold; font-size: 18px">Alice Zhang</p><p>Rédactrice</p><p>Master à IONIS</p>',
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
