export class Planet {
    constructor(info) {
        this.x = info.x;
        this.z = info.z;

        this.height = info.height || 2;

        info.gltfLoader.load(
            info.modelSrc,
            glb => {
                this.mesh = glb.scene.children[0];
                this.mesh.castShadow = true;
                this.mesh.position.set(this.x, this.height/2, this.z);
                
                if (info.modelSrc === '/models/Sun/Sun.gltf') {
                    this.mesh.scale.set(10,10,10);
                }

                this.mesh.scale.set(0.007,0.007,0.007);
                info.scene.add(this.mesh);
            }
        )
    }
}