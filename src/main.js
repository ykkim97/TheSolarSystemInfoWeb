import * as THREE from 'three';
import { Planet } from "./Planet";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
// scene.background = new THREE.Color('white'); 

// Camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.set(-5, 2, 25);
scene.add(camera);

// // Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Light
const ambientLight = new THREE.AmbientLight('white', 0.5);
scene.add(ambientLight);

// const directionalLight = new THREE.DirectionalLight('white', 1);
// directionalLight.position.x = 1;
// directionalLight.position.z = 2;
// scene.add(directionalLight);

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

// Mesh
const floorMesh = new THREE.Mesh(
	new THREE.PlaneGeometry(100,100),
	new THREE.MeshStandardMaterial({color : 'black'})
)
floorMesh.rotation.x = - Math.PI / 2;
floorMesh.receiveShadow = true;
// scene.add(floorMesh);

const planets = [];
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Sun/Sun.gltf', x : -5, z : 20, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Mercury/Mercury.gltf', x : -7, z : 10, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Venus/Venus.gltf', x : -10, z : 0, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Earth/Earth.gltf', x : 6, z : -10, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Moon/Moon.gltf', x : 10, z : -12, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/mars/Mars.gltf', x : 3, z : -20, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Jupiter/Jupiter.gltf', x : -7, z : -30, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Saturn/saturn1.gltf', x : -10, z : -45, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Uranos/Uranus.gltf', x : 5, z : -56, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Neptune/Neptune.gltf', x : 8, z : -67, height : 2 }));
planets.push(new Planet({ scene, gltfLoader, modelSrc : '/models/Pluto/Pluto.gltf', x : 3, z : -80, height : 2 }));

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
		console.log('setSection ')
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

draw();
