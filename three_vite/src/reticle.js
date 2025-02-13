// reticle.js

export class Reticle {
    constructor() {
        // Créer un élément div pour le réticule
        this.reticleElement = document.createElement('div');
        this.reticleElement.style.position = 'fixed';
        this.reticleElement.style.top = '50%';
        this.reticleElement.style.left = '50%';
        this.reticleElement.style.transform = 'translate(-50%, -50%)';
        this.reticleElement.style.width = '20px';
        this.reticleElement.style.height = '20px';
        this.reticleElement.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        this.reticleElement.style.borderRadius = '50%';
        this.reticleElement.style.pointerEvents = 'none'; // Empêche l'interaction avec le réticule
        this.reticleElement.style.zIndex = '1000'; // Assure qu'il soit au-dessus de la scène
        document.body.appendChild(this.reticleElement);

        // Initialement, cacher le réticule
        this.reticleElement.style.display = 'none';
    }

    // Afficher le réticule
    show() {
        this.reticleElement.style.display = 'block';
    }

    // Masquer le réticule
    hide() {
        this.reticleElement.style.display = 'none';
    }
}
