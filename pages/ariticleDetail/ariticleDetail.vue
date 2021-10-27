<template>
	<view>
		<view>
			<u-navbar :background="background" title="今日新闻" title-color="white" :is-back="false"></u-navbar>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				background: {
					backgroundColor: '#10aeb5',
				}
			}
		},
		methods: {
			
		},
		onLoad(e) {
			console.log(e.id);
			this.$store.dispatch("articleDetail",e.id);
		},
		computed: {
			articleContent() {
				return this.$store.state.article;
			}
		}
	}
</script>

<style>

</style>
