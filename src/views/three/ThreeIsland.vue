<template>
	<div class="webThree" id="webThree">
		<div class="ulBox">
		<div class="liBox" id="liBox"></div>
		</div>
	</div>
</template>
<script setup>
import { islandInit } from './utils/heka.js' 
import { onMounted,onUnmounted } from 'vue';
let renderLoop = false
onMounted(()=>{
	renderLoop = true
	islandInit(renderLoop)
})
onUnmounted(()=>{
	renderLoop = false
})
</script>
<style lang="scss">
.webThree {
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: fixed;
	left: 0;
	top: 0;
	.ulBox {
		width: 100%;
		height: 60px;
		position: fixed;
		left: 0;
		top: 50px;
		overflow: hidden;
	}

	.liBox {
		width: 100%;
		overflow: hidden;
		transition: all 1s;
		position: absolute;
		left: 0;
		top: 0;
	}
	.liBox h1 {
		color: #fff;
		font-size: 50px;
		line-height: 60px;
		padding-left: 30px;
	}
}
</style>