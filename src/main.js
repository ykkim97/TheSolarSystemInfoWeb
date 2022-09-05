import * as THREE from 'three';
import { Planet } from "./Planet";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from 'gsap';

// Renderer
const canvas = document.querySelector('#three-canvas');
const renderer = new THREE.WebGLRenderer({
	canvas,
	antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(-5, 2, 25);
scene.add(camera);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight('white', 0.7);
spotLight.position.set(0, 150, 100);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 1;
spotLight.shadow.camera.far = 200;
scene.add(spotLight);

// gltfLoader
const gltfLoader = new GLTFLoader();

// 행성 Mesh 추가
const planets = [];
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Sun/Sun.gltf', x : -5, z : 20, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Mercury/Mercury.gltf', x : -7, z : 10, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Venus/Venus.gltf', x : -10, z : 0, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Earth/Earth.gltf', x : 1, z : -15, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Moon/Moon.gltf', x : 10, z : -22, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/mars/Mars.gltf', x : 3, z : -45, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Jupiter/Jupiter.gltf', x : -7, z : -70, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Saturn/saturn1.gltf', x : -10, z : -115, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Uranos/Uranus.gltf', x : 5, z : -136, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Neptune/Neptune.gltf', x : 8, z : -167, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Pluto/Pluto.gltf', x : 3, z : -180, height : 2 }));

// 랜덤 위치의 별 추가(배경)
const geometry = new THREE.BufferGeometry();
const count = 10000;
const positions = new Float32Array(count * 3);
for (let i = 0; i < positions.length; i++) {
	positions[i] = (Math.random() - 0.5) * 500;
}
geometry.setAttribute(
	'position',
	new THREE.BufferAttribute(positions, 3)
);

const pointsMaterial = new THREE.PointsMaterial({
	size : 0.03,
	color : 'plum'
});
const particles = new THREE.Points(geometry, pointsMaterial);
scene.add(particles);


// 그리기
const clock = new THREE.Clock();

function draw() {
	const delta = clock.getDelta();

	renderer.render(scene, camera);
	renderer.setAnimationLoop(draw);

}

let currentSection = 0;
function setSection() {
	const newSection = Math.round(window.scrollY / window.innerHeight);

	if (currentSection !== newSection) {
		gsap.to(
			camera.position,
			{
				duration : 1,
				x : planets[newSection].x,
				z : planets[newSection].z + 5
			}
		);
		currentSection = newSection;
	}
}

function setSize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.render(scene, camera);
}

// 이벤트

window.addEventListener('scroll', setSection);
window.addEventListener('resize', setSize);

window.onload = function(){
	const elm = document.querySelectorAll('.section');
	const elmCount = elm.length;
	elm.forEach(function(item, index){
	item.addEventListener('mousewheel', function(event){
		event.preventDefault();
		let delta = 0;

		if (!event) event = window.event;
		if (event.wheelDelta) {
			delta = event.wheelDelta / 120;
			if (window.opera) delta = -delta;
		} 
		else if (event.detail) delta = -event.detail / 3;

		let moveTop = window.scrollY;
		let elmSelector = elm[index];

		// wheel down : 다음 섹션으로 이동
		if (delta < 0){
			if (elmSelector !== elmCount-1){
				try{
					moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top;
				}catch(e){}
			}
		}
		
		// wheel up : 이전 섹션으로 이동
		else{
			if (elmSelector !== 0){
				try{
				moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top;
				}catch(e){}
			}
		}

		const body = document.querySelector('html');
		window.scrollTo({top:moveTop, left:0, behavior:'smooth'});
		});
	});
}

draw();
