import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Recommend from '@/components/recommend'
import Singerlist from '@/components/singerlist'
import Singer from '@/components/singer'
import TopList from '@/components/topList'
import RankList from '@/components/rankList'
import Radio from '@/components/radio'
import Playing from '@/components/playing'
import Special from '@/components/special'

Vue.use(Router)

export default new Router({
	linkActiveClass: '',
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/singerlist',
      name: 'singerlist',
      component: Singerlist
    },
    {
      path: '/singer/:id',
      name: 'singer',
      component: Singer
    },
    {
      path: '/topList',
      name: 'topList',
      component: TopList
    },
    {
      path: '/rankList/:id',
      name: 'rankList',
      component: RankList
    },
    {
      path: '/radio',
      name: 'radio',
      component: Radio
    },
    {
      path: '/recommend/:id',
      name: 'recommend',
      component: Recommend
    },
    {
      path: '/playing',
      name: 'playing',
      component: Playing
    },
    {
      path: '/special',
      name: 'special',
      component: Special
    }
  ]
})
