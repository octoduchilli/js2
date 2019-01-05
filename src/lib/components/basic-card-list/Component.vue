<template>
  <div v-if="list" class="basic-card-list">
    <router-link v-if="!noLink" tag="div" class="card row link" v-for="card in list.content" :key="card.id" :to="{ path:`/${list.name}/${card.id}`}">
      <div class="card-image">
        <img class="miniature-image" :src="card.card.miniature.url" alt="Miniature" onerror="this.onerror=null; this.src='/static/img/logo/base.png';">
        <img class="card-logo unselectable" :src="list.logo" alt="card">
      </div>
      <div class="column">
        <h1 class="card-title">{{card.title}}</h1>
        <p class="card-date">{{card.createdAt | moment("Do MMMM YYYY - H:mm:ss")}}</p>
        <p class="card-sentence">{{card.card.description}}</p>
      </div>
      <p class="show-sentence unselectable">{{list.show.sentence}}</p>
    </router-link>
    <div v-if="noLink" class="card row" v-for="card in list.content" :key="card.id">
      <div class="card-image">
        <img class="miniature-image" :src="card.card.miniature.url" alt="Miniature" onerror="this.onerror=null; this.src='/static/img/logo/base.png';">
        <img class="card-logo unselectable" :src="list.logo" alt="card">
      </div>
      <div class="column">
        <h1 class="card-title">{{card.title}}</h1>
        <p class="card-date">{{card.createdAt | moment("Do MMMM YYYY - H:mm:ss")}}</p>
        <p class="card-sentence">{{card.card.description}}</p>
      </div>
      <p class="show-sentence unselectable">{{list.show.sentence}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list', 'noLink']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
