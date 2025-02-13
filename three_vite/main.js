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
  InstancedMesh,
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
import { createInstancedMesh } from './src/createMeshInstance.js';
import { Reticle } from './src/reticle.js'; // Import du réticule

const scene = new Scene();
scene.background = new Color(0xA5E8E9);
const aspect = window.innerWidth / window.innerHeight;
const camera = new PerspectiveCamera(45, aspect, 0.1, 1000);
camera.position.y = 200;

// Ajouter un AudioListener à la caméra
const listener = new AudioListener();
const audioLoader = new AudioLoader();
const sound = new Audio(listener);
audioLoader.load('./assets/GUN.mp3', function (buffer) {
  sound.setBuffer(buffer);
  sound.setVolume(0.5); // Ajustez le volume si nécessaire
});
camera.add(listener);


let tolook = new Vector3(-450, 100, -450);
camera.lookAt(tolook);

// Éclairage
const light = new HemisphereLight(0x72AEB1, 0xFF780B, 1.0);
scene.add(light);
const pointLight = new DirectionalLight(0xb4e7f2, 0.2, 1000);
pointLight.angle = 0.2618;
pointLight.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(pointLight);

// Contrôles (PointerLock)
const controls = new PointerLockControls(camera, document.body);
scene.add(controls.object);

const reticle = new Reticle();

// Event listeners pour Pointer Lock

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

// Raycaster setup
let raycaster = new Raycaster();
document.body.addEventListener('mousedown', () => {
  console.log("Mouse clicked");
  let mousepos = new Vector2(camera.rotation.x, camera.rotation.y);
  raycaster.setFromCamera(mousepos, camera);
  let intersects = raycaster.intersectObjects(scene.children);
  console.log(intersects);
  sound.play();
});


// Modèle Flamingo (utilisation de la fonction pour charger le modèle depuis une URL)
let url = "./assets/models/Flamingo.glb";
let mixers = [];

await loadGLTFModelFromUrl(url, scene, mixers)

let url2 = "./assets/models/desert-low_poly.glb";
await loadGLTFModelFromUrl(url2, scene, mixers)

console.log(scene.children);
let OriFlamingo = scene.children[3];
OriFlamingo.scale.set(0.5, 0.5, 0.5);
OriFlamingo.position.set(-450, 100, -450);
let desert = scene.children[4];

console.log("island children");


desert.children[0].position.set(0, 0, 0);
desert.children[0].position.set(10, 10, 10);



// Configuration du rendu
const renderer = new WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//----------------------------------------------------------------------------------
//// IMPORT DES MESH
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// CREATION DES LUMIERES
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// GESTION DES CONTROLES
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// CREATION CAMERA
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// EVENT LISTENER
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// GESTION DES SONS
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// GESTION DES INSTANCES 
//----------------------------------------------------------------------------------

//----------------------------------------------------------------------------------
//// AJOUT A LA SCENE
//----------------------------------------------------------------------------------

// Boucle d'animation
const clock = new Clock();
let u = 1;
const animation = () => {
  renderer.setAnimationLoop(animation);

  const delta = clock.getDelta();
  const elapsed = clock.getElapsedTime();

  // Mise à jour des animations des modèles
  for (let i = 0; i < mixers.length; i++) {
    mixers[i].update(delta / 2);
  }

  /*
  OriFlamingo.position.z += u;
  if (OriFlamingo.position.z > 451 || OriFlamingo.position.z < -451) {
    u *= -1;;
    OriFlamingo.rotation.y *= -1
  }
    */

  controls.update();
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
