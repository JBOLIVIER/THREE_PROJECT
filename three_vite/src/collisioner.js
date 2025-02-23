import { Box3, Vector3 } from 'three';
import {FlamingoReplication} from './FlammingoManager'
export function checkCollision(obj1, obj2) {
    // Création ou mise à jour des bounding boxes
    let box1 = new Box3().setFromObject(obj1);
    let box2 = new Box3().setFromObject(obj2);
    // Vérifier si les deux boîtes se croisent
    return box1.intersectsBox(box2);
}

export function deleter(Bull_Dir_dic, FlamingoDIR, mesh, scene, camera) { 
    Object.keys(FlamingoDIR).forEach(Fkey => {
        Object.keys(Bull_Dir_dic).forEach(Bkey => {
            if (checkCollision(scene.children[parseInt(Fkey)],scene.children[parseInt(Bkey)])) {
                scene.remove(scene.children(parseInt(Fkey).name));
                scene.remove(scene.children(parseInt(Bkey).name));
            }
        });
    });
}