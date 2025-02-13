// createMeshInstance.js

import { Mesh, InstancedMesh, Matrix4, Vector3 } from 'three';

export function createInstancedMesh(originalMesh, count, scene) {
    // Utilisation de la géométrie et du matériau du mesh original pour créer un InstancedMesh
    const geometry = originalMesh.geometry;
    const material = originalMesh.material;

    // Créer un InstancedMesh
    const instancedMesh = new InstancedMesh(geometry, material, count);
    const randomPosition = new Vector3();

    for (let i = 0; i < count; i++) {
        // Définir une position aléatoire pour chaque instance
        randomPosition.set(
            Math.random() * 100 - 50, // Position X entre -50 et 50
            Math.random() * 100 - 50, // Position Y entre -50 et 50
            Math.random() * 100 - 50  // Position Z entre -50 et 50
        );

        // Créer une matrice de transformation avec la position aléatoire
        const matrix = new Matrix4();
        matrix.setPosition(randomPosition);

        // Appliquer la matrice à l'instance
        instancedMesh.setMatrixAt(i, matrix);
    }
    scene.add(instancedMesh);
    // Ajouter l'InstancedMesh à la scène
};


