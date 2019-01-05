<template>
  <div class="all column width align-center">
    <h1 class="title-sentence">Tous</h1>

    <h1 class="title-sentence">Journaux - ({{__journals.length}})</h1>
    <div class="card-messages column align-center" v-for="journal in __journals" :key="journal.title">
      <router-link class="link" :to="`/journals/${journal.id}`">
        <h1 class="title-article text-center">{{journal.title}}</h1>
      </router-link>
      <basic-message v-for="message in journal.messages" :key="message.id" :message="message" from="journals" :id="journal.id"/>
    </div>
    <h1 class="title-sentence">Actualités - ({{__news.length}})</h1>
    <div class="card-messages column align-center" v-for="article in __news" :key="article.title">
      <router-link class="link" :to="`/news/${article.id}`">
        <h1 class="title-article text-center">{{article.title}}</h1>
      </router-link>
      <basic-message v-for="message in article.messages" :key="message.id" :message="message" from="news" :id="article.id"/>
    </div>
    <h1 class="title-sentence">Vidéos - ({{__videos.length}})</h1>
    <div class="card-messages column align-center" v-for="video in __videos" :key="video.title">
      <router-link class="link" :to="`/videos/${video.id}`">
        <h1 class="title-article text-center">{{video.title}}</h1>
      </router-link>
      <basic-message v-for="message in video.messages" :key="message.id" :message="message" from="videos" :id="video.id"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['messages'],
  computed: {
    __journals () {
      let journals = this.messages.journals

      let final = []

      for (let index in journals) {
        let j = this.$store.state.journals.content.find(_ => String(_.id) === String(index)) || null
        let messages = journals[index]

        if (j) {
          final.push({
            id: j.id,
            title: j.title,
            messages: messages
          })
        }
      }

      return final
    },
    __news () {
      let articles = this.messages.news

      let final = []

      for (let index in articles) {
        let j = this.$store.state.news.content.find(_ => String(_.id) === String(index)) || null
        let messages = articles[index]

        if (j) {
          final.push({
            id: j.id,
            title: j.title,
            messages: messages
          })
        }
      }

      return final
    },
    __videos () {
      let videos = this.messages.videos

      let final = []

      for (let index in videos) {
        let j = this.$store.state.videos.content.find(_ => String(_.id) === String(index)) || null
        let messages = videos[index]

        if (j) {
          final.push({
            id: j.id,
            title: j.title,
            messages: messages
          })
        }
      }

      return final
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
