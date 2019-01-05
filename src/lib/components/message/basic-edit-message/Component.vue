<template>
  <div class="basic-edit-message column align-center">
    <basic-input v-if="!created" class="margin-10" :input="name.input"/>
    <basic-textarea v-if="!created" class="margin-10" rows="15" cols="30" :textarea="message.input"/>
    <basic-button v-if="!created" :style="{'opacity': !__canCreate ? '.3' : '1'}" :button="button"/>
    <h1 v-if="created" class="text-center">{{$t('thanks_for_comment')}}</h1>
    <p v-if="created" class="text-center">{{$t('admin_review_comment')}}</p>
  </div>
</template>

<script>
import { db } from '@/firebase'

export default {
  props: ['list', 'from', 'id'],
  data () {
    return {
      created: false,
      name: {
        input: {
          text: '',
          label: 'name',
          needed: true,
          type: 'text'
        }
      },
      message: {
        input: {
          text: '',
          label: 'your_comment',
          needed: true
        }
      },
      button: {
        click: false,
        label: 'send'
      }
    }
  },
  computed: {
    __canCreate () {
      let name = this.name.input.text
      let message = this.message.input.text

      if (name && message) {
        return true
      }

      return false
    }
  },
  watch: {
    'button.click' (click) {
      if (click && this.__canCreate) {
        this.create()
      }

      this.button.click = false
    }
  },
  methods: {
    create () {
      let name = this.name.input.text
      let message = this.message.input.text
      let list = this.list
      let ids = []
      let id = null
      let date = new Date()

      list.forEach(_ => {
        ids.push(Number(_.id))
      })
      id = Math.max(...ids)

      if (id < 0) {
        id = 0
      } else {
        id++
      }

      db.ref(`messages/${this.from}/${this.id}/${id}`).set({
        id: id,
        name: name,
        content: message,
        createdAt: date.toString(),
        new: true,
        validated: false
      }).then(() => {
        this.created = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import 'style.scss';
</style>
