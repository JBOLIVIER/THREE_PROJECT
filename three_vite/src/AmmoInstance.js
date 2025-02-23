import {MeshBasicMaterial, SphereGeometry, Mesh} from 'three';
const geometry = new SphereGeometry(3, 32, 32);
const material = new MeshBasicMaterial({ color: 0xFCF291 });

export function addSpheres(scene, Bull_Dir_dic, camera) {

    let id = scene.children.length;
    const sphere = new Mesh(geometry, material);
    sphere.scale.set(1,0.5,0.5),
    console.log(camera.position.x,camera.position.y,camera.position.z);
    sphere.position.set(camera.position.x,camera.position.y,camera.position.z);
    Bull_Dir_dic[id] = [camera.rotation.y, camera.rotation.x];
    scene.add(sphere);
}

export function updatePos(Bull_Dir_dic,scene) {
    
    Object.keys(Bull_Dir_dic).forEach(key => {
        console.log(scene.children);
        scene.children[parseInt(key)].position.x -= 40*Math.sin(Bull_Dir_dic[key][0]);
        scene.children[parseInt(key)].position.z -= 40*Math.cos(Bull_Dir_dic[key][0]);
        scene.children[parseInt(key)].position.y += 40*Math.sin(Bull_Dir_dic[key][1]);
    });
}