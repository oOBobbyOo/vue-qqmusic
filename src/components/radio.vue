<template>
	<div class="page">
		<mt-header fixed title="电台" class="music-header">
	    <fallback-vue slot="left"></fallback-vue>
	  </mt-header>
		<div class="page-content">
			<h4 style="text-align: center;">目前无法获取电台Api o(╯□╰)o</h4>
			<h4 style="text-align: center;">
				欢迎各位在 <a href="https://github.com/Panda-Hope/vue-qqmusic/issues">Issuse</a> 提供建议
			</h4>
		</div>
	</div>
</template>

<script>
import fallbackVue from './fallback';

export default {
	name: 'radio',
	data() {
		return {

		}
	},
	components: {
		fallbackVue
	}
}
</script>

