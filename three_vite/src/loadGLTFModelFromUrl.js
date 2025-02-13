// loadGLTFModelFromUrl.js

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { AnimationMixer } from 'three';

export async function loadGLTFModelFromUrl(url, scene, mixers) {
    return new Promise((resolve, reject) => {
        const gltfLoader = new GLTFLoader();

        gltfLoader.load(
            url,
            (gltf) => {
                // Récupérer le mesh du modèle GLTF
                const mesh = gltf.scene.children[0];
                // Créer un mixer d'animation si le modèle a des animations
                const mixer = new AnimationMixer(mesh);
                if (gltf.animations.length > 0) {
                    mixer.clipAction(gltf.animations[0]).setDuration(1).play();
                }

                // Ajouter le modèle à la scène
                scene.add(gltf.scene);
                mixers.push(mixer); // Ajouter le mixer d'animation à la liste des mixeurs

                resolve(gltf.scene); // Résoudre la promesse avec l'objet chargé
            },
            undefined,  // Option pour suivre la progression du chargement (peut être utilisée)
            (error) => {
                // En cas d'erreur lors du chargement
                console.error('Erreur de chargement du modèle GLTF:', error);
                reject(error);  // Rejeter la promesse en cas d'erreur
            }
        );
    });
}

