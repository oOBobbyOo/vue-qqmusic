<template>
	<div class="page">
		<mt-header fixed title="排行" class="music-header">
		  <fallback-vue slot="left"></fallback-vue>
		</mt-header>
		<div class="page-content">
		  <ul class="music-list">
		    <li>
		      <mt-cell title="Q Q 音 乐 巅 峰 榜" class="music-cell-type1"></mt-cell>
		    </li>
		    <router-link 
		      tag="li" 
		      :to="{name: 'rankList', params: { id: item.id }}" 
		      v-for="item in topList"
		      key="item.id" >
		      <mt-cell class="music-cell-type2">
		        <div class="listen-cover">
		          <img v-lazy="item.picUrl">
		          <span class="listen-count">
		            <i class="listen-icon"></i>
		            {{ item.listenCount | listenFormat }}万
		          </span>
		          <i class="listen-play"></i>
		        </div>
		        <ul slot="title" class="song-list">
		          <li v-for="(song, index) in item.songList" key="index" class="song-item"> 
		            {{ index+1 }}
		            {{ song.songname}}
		            <span class="song-singer">{{ '- '+song.singername }}</span>
		          </li>
		        </ul>
		        <i slot="right" class="song-arrow"></i>
		      </mt-cell>
		    </router-link>
		  </ul>
		</div>
	</div>
</template>

<script>
import { apiHandler } from '@/api/index';
import fallbackVue from './fallback';
import { listenFormat } from '../filters';

export default {
	name: 'topList',
	created() {
	  let self = this;
	  apiHandler('topList', (response) => {
	    self.topList = response.data.topList;
	  })
	},
	data() {
		return {
			topList: {}
		}
	},
	filters: {
		listenFormat
	},
	components: {
		fallbackVue
	}
}
</script>

<style lang="scss" scope>
.music-list {
  > li {
    margin: 0 10px 10px;
  }
}
.music-cell-type1 {
	.mint-cell {
		&-title {
			text-align: center;
			font-size: 16px;
		}
	}
	&:last-child {
		background-image: none;
	}
	.mint-cell-wrapper {
		background-image: none;
	}
}
.music-cell-type2 {
	&:before,&:after {
		color: transparent;
	}
	.mint-cell-wrapper {
		flex-direction: row-reverse;
		padding: 0;
		background-image: none;
	}
	.mint-cell-title {
		overflow: hidden
	}
	.mint-cell-value {
		width: 33%;
		img {
			opacity: 0;
			transition: opacity .5s ease-in;
			&[lazy="loaded"],&[lazy="error"] {
				opacity: 1
			}
		}
		.listen-cover {
			position: relative;
			width: 100%;
			img {
				display: block;
				width: 100%;
				max-width: 100%;
			}
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
			.listen-count {
				position: absolute;
				top: 100%;
				margin-top: -16px;
				font-size: 10px;
				color: #fff;
			}
		}
	}
	.mint-cell-right {
		display: flex;
		align-items: center;
		transform: initial;
		color: rgba(0,0,0,.5);
	}
	.song-list {
		margin: 0 10px 0 10px; 
		.song-title {
			font-size: 16px;
			margin-bottom: 5px;
		}
		.song-item {
		  white-space: nowrap;
		  overflow: hidden;
		  text-overflow: ellipsis;
			font-size: 14px;
		}
		.song-singer {
			color: rgba(0,0,0,.5);
		}
		li {
			line-height: 30px;
		}
	}
	.song-arrow {
    position: absolute;
    right: 10px;
    top: 50%;
    margin-top: -4px;
    width: 6px;
    height: 6px;
    border-right: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
	}
}
</style>