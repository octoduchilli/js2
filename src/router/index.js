import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pods/Home'
import About from '@/pods/about/About'
import Contact from '@/pods/contact/Contact'
import Journals from '@/pods/journals/Journals'
import ShowJournal from '@/pods/journals/show/Show-journal'
import News from '@/pods/news/News'
import ShowNew from '@/pods/news/show/Show-new'
import Videos from '@/pods/videos/Videos'
import ShowVideo from '@/pods/videos/show/Show-video'
import Admin from '@/pods/admin/Admin'
import Create from '@/pods/admin/create/Create'
import CreateJournals from '@/pods/admin/create/journals/Journals'
import CreateNews from '@/pods/admin/create/news/News'
import CreateVideos from '@/pods/admin/create/videos/Videos'
import Modif from '@/pods/admin/modif/Modif'
import ModifJournals from '@/pods/admin/modif/journals/Journals'
import EditJournal from '@/pods/admin/modif/journals/edit/Edit-journal'
import ModifNews from '@/pods/admin/modif/news/News'
import EditNew from '@/pods/admin/modif/news/edit/Edit-new'
import ModifVideos from '@/pods/admin/modif/videos/Videos'
import EditVideo from '@/pods/admin/modif/videos/edit/Edit-video'
import Delete from '@/pods/admin/delete/Delete'
import DeleteJournals from '@/pods/admin/delete/journals/Journals'
import DeleteNews from '@/pods/admin/delete/news/News'
import DeleteVideos from '@/pods/admin/delete/videos/Videos'
import Comments from '@/pods/admin/comments/Comments'
import AllComments from '@/pods/admin/comments/all/All'
import NewComments from '@/pods/admin/comments/new/New'
import UnvalidComments from '@/pods/admin/comments/unvalid/Unvalid'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/journals',
      name: 'Journals',
      component: Journals
    },
    {
      path: '/journals/:id',
      component: ShowJournal
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/news/:id',
      component: ShowNew
    },
    {
      path: '/videos',
      name: 'Videos',
      component: Videos
    },
    {
      path: '/videos/:id',
      component: ShowVideo
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: 'create',
          component: Create,
          children: [
            {
              path: 'journals',
              component: CreateJournals
            },
            {
              path: 'news',
              component: CreateNews
            },
            {
              path: 'videos',
              component: CreateVideos
            }
          ]
        },
        {
          path: 'modif',
          component: Modif,
          children: [
            {
              path: 'journals',
              component: ModifJournals
            },
            {
              path: 'journals/:id',
              component: EditJournal
            },
            {
              path: 'news',
              component: ModifNews
            },
            {
              path: 'news/:id',
              component: EditNew
            },
            {
              path: 'videos',
              component: ModifVideos
            },
            {
              path: 'videos/:id',
              component: EditVideo
            }
          ]
        },
        {
          path: 'delete',
          component: Delete,
          children: [
            {
              path: 'journals',
              component: DeleteJournals
            },
            {
              path: 'news',
              component: DeleteNews
            },
            {
              path: 'videos',
              component: DeleteVideos
            }
          ]
        },
        {
          path: 'comments',
          component: Comments,
          children: [
            {
              path: 'all',
              component: AllComments
            },
            {
              path: 'new',
              component: NewComments
            },
            {
              path: 'unvalid',
              component: UnvalidComments
            }
          ]
        }
      ]
    }
  ]
})
