export function FlamingoReplication(mesh, scene , FlamingoDIR, camera) {
    let id = scene.children.length;
    mesh.position.set(camera.position.x,camera.position.y,camera.position.z);
    let xspeed = getRandomNumber(2, 5);
    let zspeed = getRandomNumber(2, 5);
    FlamingoDIR[id] = [xspeed, zspeed];
    scene.add(mesh);
}
function getRandomNumber(min, max) {
    let speed;
    do {
        speed = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (speed === 0); // Exclure zéro
    return speed;
}


export function UpdtateFlamingoPos(FlamingoDIR, scene) {
    Object.keys(FlamingoDIR).forEach(key => {
        console.log(scene.children);
        scene.children[parseInt(key)].position.x += FlamingoDIR[key][0];
        scene.children[parseInt(key)].position.z += FlamingoDIR[key][1];
    });
}