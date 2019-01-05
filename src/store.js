import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    window: {
      width: null,
      height: null,
      scrollY: null
    },
    body: {
      width: null,
      height: null
    },
    route: {
      selected: 0
    },
    admin: {
      uid: null,
      filters: {
        action: {
          label: 'ACTION',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'CREER',
              value: 'create'
            },
            {
              id: 2,
              name: 'MODIFIER',
              value: 'modif'
            },
            {
              id: 3,
              name: 'SUPPRIMER',
              value: 'delete'
            }
          ]
        },
        media: {
          label: 'MEDIA',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'JOURNAUX',
              value: 'journals'
            },
            {
              id: 2,
              name: 'ACTUALITES',
              value: 'news'
            },
            {
              id: 3,
              name: 'VIDEOS',
              value: 'videos'
            }
          ]
        }
      }
    },
    journals: {
      content: [],
      name: 'journals',
      show: {
        sentence: 'see_journal'
      },
      logo: '/static/img/buttons/header/newspaper-black.png',
      filters: {
        date: {
          label: 'date',
          selected: 2,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'least_recent'
            },
            {
              id: 2,
              name: 'most_recent'
            }
          ]
        },
        title: {
          label: 'title',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'a_to_z'
            },
            {
              id: 2,
              name: 'z_to_a'
            }
          ]
        }
      }
    },
    news: {
      content: [],
      name: 'news',
      show: {
        sentence: 'see_new'
      },
      logo: '/static/img/buttons/header/news-black.png',
      filters: {
        date: {
          label: 'date',
          selected: 2,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'least_recent'
            },
            {
              id: 2,
              name: 'most_recent'
            }
          ]
        },
        title: {
          label: 'title',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'a_to_z'
            },
            {
              id: 2,
              name: 'z_to_a'
            }
          ]
        }
      }
    },
    videos: {
      content: [],
      name: 'videos',
      show: {
        sentence: 'see_video'
      },
      logo: '/static/img/buttons/header/play-black.png',
      filters: {
        date: {
          label: 'date',
          selected: 2,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'least_recent'
            },
            {
              id: 2,
              name: 'most_recent'
            }
          ]
        },
        title: {
          label: 'title',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'a_to_z'
            },
            {
              id: 2,
              name: 'z_to_a'
            }
          ]
        }
      }
    }
  }
})
