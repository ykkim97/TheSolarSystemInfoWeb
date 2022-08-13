import gsap from "gsap";
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
                    this.mesh.scale.set(1.7,1.7,1.7);
                    this.mesh.position.x = -7;
                    this.mesh.position.y = 0.3;
                } else if (info.modelSrc === '/models/Mercury/Mercury.gltf') {
                    this.mesh.scale.set(0.003,0.003,0.003);
                    this.mesh.position.y = 1.5;
                    this.mesh.position.x= -6.5;
                } else if (info.modelSrc === '/models/Venus/Venus.gltf') {
                    this.mesh.scale.set(0.004,0.004,0.004);
                    this.mesh.position.y = 1.5;
                } else if (info.modelSrc === '/models/Earth/Earth.gltf') {
                    this.mesh.scale.set(0.007,0.007,0.007);
                    this.mesh.position.y = 1.5;
                } else if (info.modelSrc === '/models/mars/Mars.gltf') {
                    this.mesh.scale.set(0.007,0.007,0.007);
                } else if (info.modelSrc === '/models/Moon/Moon.gltf') {
                    this.mesh.scale.set(0.003,0.003,0.003);
                    this.mesh.position.y = 1.5;
                } else if (info.modelSrc === '/models/Jupiter/Jupiter.gltf') {
                    this.mesh.scale.set(0.025,0.025,0.025);
                    this.mesh.position.y = 2;
                } else if (info.modelSrc === '/models/Saturn/saturn1.gltf') {
                    this.mesh.scale.set(0.02,0.02,0.02);
                    this.mesh.position.y = 1.5;
                } else if (info.modelSrc === '/models/Uranos/Uranus.gltf') {
                    this.mesh.scale.set(0.02,0.02,0.02);
                    this.mesh.position.y = 1.5;
                    this.mesh.rotation.z = - Math.PI / 9;
                } else if (info.modelSrc === '/models/Neptune/Neptune.gltf') {
                    this.mesh.scale.set(0.017,0.017,0.017);
                    this.mesh.position.y = 1.5;
                } else if (info.modelSrc === '/models/Pluto/Pluto.gltf') {
                    this.mesh.scale.set(0.006,0.006,0.006);
                    this.mesh.position.y = 1.5;
                }

                // gsap.to(
                //     this.mesh.rotation,
                //     {
                //         duration : 1,
                //         repeat : -1,
                //         z : Math.PI
                //     }
                // )

                // else this.mesh.scale.set(0.007,0.007,0.007);
                info.scene.add(this.mesh);
            }
        )
    }
}