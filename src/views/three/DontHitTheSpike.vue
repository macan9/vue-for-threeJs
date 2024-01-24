<template>
  <div class="dont-hit-the-spikes">
    <h1>Press the up arrow to jump</h1>
    <h1 class="score">score: 0</h1>
    <h1 class="lastScore">Last score: 0</h1>
    <h1 class="lose">You lose!</h1>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { TimelineMax } from "gsap/all";
import { onMounted,onUnmounted } from "vue";

var render,renderer,player
onMounted(() => {
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);
	camera.position.z = 10;
	camera.position.y = 2;
	player = {
		pos: new THREE.Vector3(0, 2, 10),
		vel: new THREE.Vector3(0, 0, 0),
		acc: new THREE.Vector3(0, 0, 0),
		hit: false,
		wantX: 0,
		jumping: false,
	};
	var panSpeed = 0.4;

	var gravity = new THREE.Vector3(0, -0.1, 0);

	var floorgeo = new THREE.BoxGeometry(30, 0.5, 500);
	var floormat = new THREE.MeshLambertMaterial({ color: 0x0000aa });
	var floormesh = new THREE.Mesh(floorgeo, floormat);
	scene.add(floormesh);

	var ceilinggeo = new THREE.BoxGeometry(30, 0.5, 500);
	var ceilingmat = new THREE.MeshLambertMaterial({ color: 0x0000aa });
	var ceilingmesh = new THREE.Mesh(ceilinggeo, ceilingmat);
	scene.add(ceilingmesh);
	ceilingmesh.position.y = 15;

	scene.fog = new THREE.Fog("#001d45", 10, 300);

	var cones = [];
	for (var i = 0; i < 1000; i++) {
	let h = 5;
	if (Math.random() <= 0.33) h = 10;
	var geometry = new THREE.ConeGeometry(3, h, 10);
	var material = new THREE.MeshBasicMaterial({ color: "#fcba03" });
	var cone = new THREE.Mesh(geometry, material);
	cones.push(cone);
	scene.add(cone);
	cone.position.z = -i * 30 - 30;
	cone.originalZ = -i * 30 - 30;
	cone.h = h;
	if (Math.random() <= 0.5) {
		cone.position.y = 15;
		cone.rotation.z = Math.PI;
	}
		let dirR = Math.random();
		if (dirR <= 0.33) cone.position.x = -7.5;
		if (dirR >= 0.66) cone.position.x = 7.5;
	}

	var light1 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
	scene.add(light1);

	var light = new THREE.PointLight(0xff0000, 1, 100);
	light.position.set(10, 7.5, player.pos.z);
	scene.add(light);


	renderer = new THREE.WebGLRenderer({ antialias: true });
	scene.background = new THREE.Color("#001d45");
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	window.addEventListener("resize", () => {
		renderer.setSize(window.innerWidth, window.innerHeight);
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
	});

	render = () => {
		requestAnimationFrame(render);

		let dead = false;
		for (var i = 0; i < cones.length; i++) {
			cones[i].position.z += panSpeed;

			let dist = player.pos.distanceTo(cones[i].position);
			let size = 3;
			if (cones[i].h > 5) size = 5;
			if (Math.floor(dist) < size && !player.hit) {
				dead = true;
				panSpeed = 0.399;
				document.querySelector(".lastScore").innerHTML =
				"Last score: " + Math.floor(cones[0].position.z + 30);
				document.querySelector(".lose").classList.add("show");
				setTimeout(() => {
				document.querySelector(".lose").classList.remove("show");
				}, 1000);
			}
		}

		panSpeed += 0.001;

		if (dead) {
			player.hit = true;
			setTimeout(() => {
				player.hit = false;
			}, 1000);
			for (let i = 0; i < cones.length; i++) {
				const tl = new TimelineMax();
				tl.to(cones[i].position, 1, { z: cones[i].originalZ });
			}
		}

		player.acc.add(gravity);

		player.vel.add(player.acc);
		player.pos.add(player.vel);
		player.acc.set(0, 0, 0);

		if (player.wantX > player.pos.x) player.pos.x++;
		if (player.wantX < player.pos.x) player.pos.x--;

		if (
			(player.pos.y >= 13 && camera.rotation.z !== 0) ||
			(player.pos.y <= 2 && camera.rotation.z == 0)
		) {
			player.jumping = false;
			player.vel.y = 0;
		}

		player.pos.clamp(
			new THREE.Vector3(-7.5, 2, 10),
			new THREE.Vector3(7.5, 13, 10)
		);

		light.position.set(10, 7.5, player.pos.z);
		camera.position.set(player.pos.x, player.pos.y, player.pos.z);

		if(document.querySelector(".score")){
			document.querySelector(".score").innerHTML =
			"Score: " + Math.floor(cones[0].position.z + 30);
		}

		renderer.render(scene, camera);
	};
	render();

	document.addEventListener("keyup", (e) => {
		if (e.code === "ArrowUp") {
		gravity.y *= -1;
		player.vel.y = 0;
		const tl = new TimelineMax();
		if (camera.rotation.z == 0) {
			tl.to(camera.rotation, 0.2, { z: Math.PI });
		} else {
			tl.to(camera.rotation, 0.2, { z: Math.PI * 2 });
			tl.to(camera.rotation, 0, { z: 0 });
		}
		}
		if (camera.rotation.z == 0) {
		if (e.code === "Space" && !player.jumping) {
			player.jumping = true;
			player.acc.y += 1.2;
		}
		if (e.code === "ArrowLeft") {
			if (player.wantX >= 0) player.wantX -= 7.5;
		}
		if (e.code === "ArrowRight") {
			if (player.wantX <= 0) player.wantX += 7.5;
		}
		} else {
		if (e.code === "Space" && !player.jumping) {
			player.jumping = true;
			player.acc.y -= 1.2;
		}
		if (e.code === "ArrowRight") {
			if (player.wantX >= 0) player.wantX -= 7.5;
		}
		if (e.code === "ArrowLeft") {
			if (player.wantX <= 0) player.wantX += 7.5;
		}
		}
	});
});

onUnmounted(()=>{
	renderer.dispose()
	player.hit = true;
})
</script>
<style lang="scss">
.dont-hit-the-spikes {
	width: 100%;
	height: 100%;
  h1 {
    // position: absolute;
    max-width: 150px;
    top: 0.5rem;
    left: 1.5rem;
    color: #fcba03;
    font-size: 1.25rem;
    text-shadow: 2px 2px rgba(0, 0, 0, 0.5);
    font-family: Arial;
  }

  &.lastScore {
    left: calc(100vw - 10.8rem);
    top: 2rem;
  }
  &.score {
    left: calc(100vw - 8rem);
  }
  &.lose {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -100%);
    width: 100vw !important;
    max-width: 100vw;
    font-size: 5rem;
    text-align: center;
    opacity: 0;
    transition: opacity 0.2s ease-out;
  }
  &.show {
    opacity: 1;
  }
  canvas {
    display: block;
  }
}
</style>
