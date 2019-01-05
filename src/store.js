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
        sentence: 'Voir le journal'
      },
      logo: '/static/img/buttons/header/newspaper-black.png',
      filters: {
        date: {
          label: 'DATE',
          selected: 2,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'PLUS ANCIEN'
            },
            {
              id: 2,
              name: 'PLUS RÉCENT'
            }
          ]
        },
        title: {
          label: 'TITRE',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'De A à Z'
            },
            {
              id: 2,
              name: 'De Z à A'
            }
          ]
        }
      }
    },
    news: {
      content: [],
      name: 'news',
      show: {
        sentence: 'Voir l\'actualité'
      },
      logo: '/static/img/buttons/header/news-black.png',
      filters: {
        date: {
          label: 'DATE',
          selected: 2,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'PLUS ANCIEN'
            },
            {
              id: 2,
              name: 'PLUS RÉCENT'
            }
          ]
        },
        title: {
          label: 'TITRE',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'De A à Z'
            },
            {
              id: 2,
              name: 'De Z à A'
            }
          ]
        }
      }
    },
    videos: {
      content: [],
      name: 'videos',
      show: {
        sentence: 'Voir la vidéo'
      },
      logo: '/static/img/buttons/header/play-black.png',
      filters: {
        date: {
          label: 'DATE',
          selected: 2,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'PLUS ANCIEN'
            },
            {
              id: 2,
              name: 'PLUS RÉCENT'
            }
          ]
        },
        title: {
          label: 'TITRE',
          selected: 0,
          mouse: {
            over: false,
            click: false
          },
          content: [
            {
              id: 1,
              name: 'De A à Z'
            },
            {
              id: 2,
              name: 'De Z à A'
            }
          ]
        }
      }
    }
  }
})
