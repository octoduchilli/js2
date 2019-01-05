<template>
  <div class="basic-message-list column align-center">
    <h1>Commentaires - ({{__listLength}})</h1>
    <basic-edit-message v-if="edit.show" :list="messages.list" :from="messages.from" :id="messages.id"/>
    <basic-button class="margin-20" v-else style="width: 230px" :button="edit.button"/>
    <basic-message v-if="message.validated || __admin.uid" v-for="message in messages.list" :key="message.id" :message="message" :from="messages.from" :id="messages.id"/>
  </div>
</template>

<script>
export default {
  props: ['messages'],
  data () {
    return {
      edit: {
        show: false,
        button: {
          click: false,
          label: 'AJOUTER UN COMMENTAIRE'
        }
      }
    }
  },
  computed: {
    __admin () {
      return this.$store.state.admin
    },
    __listLength () {
      let admin = this.__admin
      let list = this.messages.list
      let length = 0

      list.forEach(_ => {
        if (_.validated) {
          length++
        }
      })

      if (admin.uid) {
        return list.length
      }

      return length
    }
  },
  watch: {
    'edit.button.click' (click) {
      if (click) {
        this.edit.show = true
      }

      this.edit.button.click
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
