"use strict";

// Import only what you need, to help your bundler optimize final code size using tree shaking
// see https://developer.mozilla.org/en-US/docs/Glossary/Tree_shaking)
import * as dat from 'dat.gui';
import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  AmbientLight,
  Clock,
  SphereGeometry,
  MeshStandardMaterial,
  PointLight,
  Group,
  Matrix4,
  HemisphereLight,
  AnimationMixer,
  SpotLight,
  Raycaster,
  DirectionalLight,
  Vector2,
  Ray,
  BufferGeometry,
  LineBasicMaterial,
  Line,
  Vector3,
  Color,
  AudioListener,
  AudioLoader,
  Audio,
} from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { loadGLTFModelFromUrl } from './src/loadGLTFModelFromUrl.js';
// import { createInstancedMesh } from './src/createMeshInstance.js';
import { Reticle } from './src/reticle.js'; // Import du réticule
import { addSpheres, updatePos} from './src/AmmoInstance.js';
import {deleter} from './src/collisioner.js';
import { FlamingoReplication, UpdtateFlamingoPos} from './src/FlammingoManager.js';
const scene = new Scene();
scene.background = new Color(0xA5E8E9);
const aspect = window.innerWidth / window.innerHeight;


// Configuration du rendu
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//----------------------------------------------------------------------------------
//// IMPORT DES MESH 
//----------------------------------------------------------------------------------

let url = "./assets/models/Flamingo.glb";
let mixers = [];

await loadGLTFModelFromUrl(url, scene, mixers)

let url2 = "./assets/models/desert-low_poly.glb";
await loadGLTFModelFromUrl(url2, scene, mixers)


console.log(scene.children);
let OriFlamingo = scene.children[0];
let FlamingoMesh =  OriFlamingo.children[0];
console.log(FlamingoMesh);
console.log("OriFlamingo");
console.log(OriFlamingo);
OriFlamingo.scale.set(0.5, 0.5, 0.5);
OriFlamingo.position.set(-2000, -2000, -2000);
let desert = scene.children[1];
console.log("island children");
desert.children[0].position.set(10, 10, 10);

// gun
/*
let url3 = "./assets/models/Shoygun.glb";
await loadGLTFModelFromUrl(url3, scene, mixers)
let gun = scene.children[2];
gun.position.set(-450, 100, -450);
function UpdateGunRot(camera, gun) {
  gun.rotation.x =  camera.rotation.x;
  gun.rotation.y =  camera.rotation.y;
  gun.rotation.z =  camera.rotation.z;
}
*/

//----------------------------------------------------------------------------------
//// CREATION CAMERA
//----------------------------------------------------------------------------------

const camera = new PerspectiveCamera(45, aspect, 0.1, 10000);
camera.position.y = 200;
let tolook = new Vector3(-450, 100, -450);
camera.lookAt(tolook);

//----------------------------------------------------------------------------------
//// CREATION DES LUMIERES
//----------------------------------------------------------------------------------

const light = new HemisphereLight(0xF4FFD4, 0xFF780B, 1.0);
scene.add(light);
const pointLight = new DirectionalLight(0xb4e7f2, 0.2, 1000);
pointLight.angle = 0.2618;
pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(pointLight);

//----------------------------------------------------------------------------------
//// GESTION DES CONTROLES
//----------------------------------------------------------------------------------

const controls = new PointerLockControls(camera, document.body);
scene.add(controls.object);
const reticle = new Reticle();

//----------------------------------------------------------------------------------
//// EVENT LISTENER
//----------------------------------------------------------------------------------

let raycaster = new Raycaster();
document.body.addEventListener('mousedown', () => {
  console.log("Mouse clicked");
  let mousepos = new Vector2(camera.rotation.x, camera.rotation.y);
  raycaster.setFromCamera(mousepos, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);
  sound.play();
});

document.body.addEventListener('click', () => {
  document.body.requestPointerLock();
}, false);

document.addEventListener('pointerlockchange', () => {
  if (document.pointerLockElement === document.body) {
    console.log("Pointer Lock Activated");
    reticle.show(); // Afficher le réticule
  } else {
    console.log("Pointer Lock Released");
    reticle.hide(); // Masquer le réticule
  }
}, false);

const AmoDic = {};
let isMouseDown = false;
let intervalId = null;

document.addEventListener('mousedown', () => {
    if (!isMouseDown) {
        isMouseDown = true;
        addSpheres(scene, AmoDic, camera);
        intervalId = setInterval(() => {
            addSpheres(scene, AmoDic, camera);
        }, 200); // 500 ms = 2 fois par seconde
    }
});

document.addEventListener('mouseup', () => {
    isMouseDown = false;
    clearInterval(intervalId); // Arrête la répétition
});


//----------------------------------------------------------------------------------
//// GESTION DES SONS
//----------------------------------------------------------------------------------

const listener = new AudioListener();
const audioLoader = new AudioLoader();
const sound = new Audio(listener);
audioLoader.load('./assets/GUN.mp3', function (buffer) {
  sound.setBuffer(buffer);
  sound.setVolume(0.5); // Ajustez le volume si nécessaire
});
camera.add(listener);

//----------------------------------------------------------------------------------
//// GESTION DES INSTANCES 
//----------------------------------------------------------------------------------

// start
const FlamingoDIR  = {};
FlamingoReplication(FlamingoMesh,scene,FlamingoDIR, camera);


//----------------------------------------------------------------------------------
//// BOUCLE D'ANIMATION
//----------------------------------------------------------------------------------

const clock = new Clock();
let u = 1;
const animation = () => {
  renderer.setAnimationLoop(animation);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();
  // UpdateGunRot(camera, gun);  
  // Mise à jour des animations des modèles
  for (let i = 0; i < mixers.length; i++) {
    mixers[i].update(delta / 2);
  }
  if (AmoDic.length != 0) {updatePos(AmoDic,scene);}
  deleter(AmoDic, FlamingoDIR, FlamingoMesh, scene, camera);
  if (FlamingoDIR.length != 0) {UpdtateFlamingoPos(FlamingoDIR,scene)};


  //controls.update();
  renderer.render(scene, camera);
};

animation();

// Écouteur de redimensionnement de la fenêtre
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// TODO 
// raycaster fonctionnel, visualisation des tirs, scoring, mutiplication des flammand roses, boom, delete les out-of views