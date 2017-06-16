<template>
  <div class="page">
    <mt-header fixed 
      title="音乐馆"
      class="music-header scroll-header"
      :style="searchVisible && {top: '-40px'}"></mt-header>
    <form @submit="searching">
      <search-vue v-model="searchValue" 
        :visible.sync="searchVisible" 
        :style="searchVisible && {top: '-40px', height: '100%',height: '100vh'}">
        <div class="hotkey-wrapper" v-if="searchState == 0">
          <p>热门搜索</p>
          <ul class="hotkey-list">
            <template v-for="(item, index) in hotkeys">
                <template v-if="index == 0 ">
                  <li class="speical" @click="goSpecial(item.url)">{{ item.k }}</li>
                </template>
                <template v-else>
                  <li @click="hoykeySearch(item.k)">{{ item.k }}</li>
                </template>
              </template>
          </ul>
        </div>
        <div class="result-list" v-if="searchState == 2">
          <mt-cell class="music-cell-type5" 
              v-for="(item, index) in searchResult"
              key="index"
              @click.native="playSingleMusic(item)">
              <i class="music-icon"></i>
              <div class="song-wrapper">
                <p>{{ item.name }}</p>
                <p>{{ item.singer }}</p>
              </div>
          </mt-cell>
        </div>
      </search-vue>
    </form>
    <div class="page-content" style="margin-top: 84px;padding-top: 0;">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(item, index) in indexMsg.slider" key="index">
          <img :src="item.picUrl" class="slider-item" @click="goSpecial(item.linkUrl)">
        </swiper-slide>
        <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
      <ul class="radio-list">
        <li v-for="item in musiclist" @click="$router.push({name: item.route})">
          <img class="icon" :src="require(`../assets/${item.icon}`)">
          <span class="name">{{ item.name }}</span>
        </li>
      </ul>
      <div class="recommend-wrapper">
        <p class="title">热 门 推 荐</p>
        <ul class="recommend-list">
          <router-link v-for="(item, index) in indexMsg.songList"
            tag="li"
            key="index"
            :to="{ name: 'recommend', params: {id: item.id}}">
            <div class="cover-wrapper">
              <img :src="item.picUrl">
              <span class="listen-count">
                <i class="listen-icon"></i>
                {{ item.accessnum | listenFormat }}万
              </span>
              <i class="listen-play"></i>
            </div>
            <span class="song-desc">{{ item.songListDesc }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { apiHandler } from '@/api/index';
import { dealHotkey } from '../util';
import { listenFormat } from '../filters';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import searchVue from './search';

export default {
  name: 'index',
  created() {
    apiHandler('indexMsg', (response) => {
      this.indexMsg = response.data;
      apiHandler('hotkey', (response) => {
        this.hotkeys = dealHotkey(response.data);
        console.log(this.hotkeys);
      });
    });
  },
  data () {
    return {
      indexMsg: {},
      searchVisible: false, 
      searchValue: '',     // input value,
      searchState: 0,      // search input bar state 0: ready, 1: searching, 2: search result,
      searchResult: {},    // song search result
      banners: [],
      hotkeys: {},
      musiclist: [
        {
          icon: 'people.png',
          name: '歌手',
          route: 'singerlist'
        },
        {
          icon: 'rank.png',
          name: '排行',
          route: 'topList'
        },
        {
          icon: 'radio.png',
          name: '电台',
          route: 'radio'
        }
      ],
      swiperOption: {
        autoplay: 5000,
        initialSlide: 1,
        loop: true,
        pagination: '.swiper-pagination'
      }
    }
  },
  methods: {
    hoykeySearch(hotkey) {
      this.searchValue = hotkey;
      this.searching();
    },
    searching(e) {
      e && e.preventDefault();
      let searchValue = this.searchValue;
      this.searchState = 1; // searching

      apiHandler({
        name: 'search',
        params: {
              key: searchValue
            }
      }, response => {
        this.searchState = 2; // search result
        this.searchResult = response.data.song.itemlist || [];
      });
    },
  },
  filters: {
    listenFormat
  },
  watch: {
    searchVisible(visible) {
      if (!visible) {
        this.searchState = 0;
        this.searchResult = [];
      }
    },
    searchState(state) {
      if (state == 1) {
        this.$indicator.open(`正在搜索${this.searchValue}`);
      }else {
        this.$indicator.close();
      }
    }
  },
  components: {
    searchVue,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="scss">
.hotkey-wrapper {
  padding: 15px;  
  p:first-child {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.5);
    margin-bottom: 10px
  }
  .hotkey-list {
    display: flex;
    flex-wrap: wrap;
    > li {
      font-size: 14px;
      margin-right: 5px;
      margin-bottom: 10px;
      text-align: center;
      padding: 0 10px;
        height: 30px;
        line-height: 30px;
      border-radius: 16px;
      border: 1px solid #D7D7D7;
      &.speical {
        border-color: #31c27c;
        color: #31c27c;
      }
    }
  }
}
.music-cell-type5 {
  .mint-cell-title {
    flex: 0;
  }
  .mint-cell-value {
    flex: 1;
    .music-icon {
      width: 22px;
      height: 20px;
      margin-right: 20px;
      background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/search_sprite.png?max_age=19830212&d=20151105145423);
      background-repeat: no-repeat;
      background-size: 22px 30px;
    }
    .song-wrapper {
      margin: 10px 0 2px;
      line-height: 18px;
      font-size: 16px;
      p:first-child {
        color: initial;
      }
      p:last-child {
        margin-bottom: 5px;
        font-size: 14px;
      }
    }
  }
}
.swiper-container {
  z-index: 0;
  .slider-item {
    display: block;
    max-width: 100%; 
    height: auto; 
  }
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
}
.radio-list {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  > li {
    display: flex;
    flex: 1;
    justify-content: center;
      align-items: center;
    .icon {
      display: inline-block;
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
    .name {
      font-size: 14px;
    }
  }
}
.recommend-wrapper {
  .title {
    text-align: center;
    line-height: 48px;
    font-size: 20px;
  }
  .recommend-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    > li {
      flex-basis: 33%;
      .cover-wrapper {
        position: relative;
        .listen-count {
          position: absolute;
            top: 100%;
            margin-top: -16px;
            font-size: 10px;
            color: #fff;
            .listen-icon {
                  display: inline-block;
                width: 10px;
                height: 10px;
                margin-left: 3px;
                margin-right: 3px;
                background-position: 0 -50px;
                background-image: url(https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=19830212&d=20151105145423);
                background-repeat: no-repeat;
                background-size: 24px 60px;
            }
        }
        .listen-play {
                position: absolute;
              top: 100%;
              right: 5px;
              width: 24px;
              height: 24px;
              margin-top: -28px;
              background: url('https://y.gtimg.cn/mediastyle/mobile/yqq_v5/img/list_sprite.png?max_age=19830212&d=20151105145423');
              background-repeat: no-repeat;
              background-size: 24px 60px;
          }
        img {
          display: block;
          max-width: 100%; 
          height: auto; 
        }
      }
      .song-desc {
        display: block;
        padding: 5px;
        font-size: 12px;
        line-height: 1.2;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
