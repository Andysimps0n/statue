import * as three from 'three';
import { DirectionalLightHelper } from 'three';

export default function lights(scene) {




    // Ambient Light
    const ambientLight = new three.AmbientLight( 0xffffff, 1); 
    scene.add( ambientLight );





    // directional light
    const directionalLight = new three.DirectionalLight(0xffffff, 0)
    const directionalLightHelper = new three.DirectionalLightHelper(directionalLight, 5 )
    directionalLight.position.set( 3, 3, 3 )
    directionalLight.castShadow = true; // Enable shadows if needed
    const directionalLightTarget = new three.Object3D();
    directionalLightTarget.position.set(-10, 0, 0); // Target point
    scene.add(directionalLightTarget); // Add target to the scene
    directionalLight.target = directionalLightTarget; // Set light's target
    scene.add(directionalLight)




    // Spot Light
    const spotLight = new three.SpotLight(0xffffff, 600); // Color and intensity
    spotLight.position.set(10, 60, 10); // Position the light
    spotLight.angle = Math.PI / 4; // Cone angle in radians
    spotLight.penumbra = 0.2; // Soft edge of the light
    spotLight.decay = 2; // How the light dims over distance
    spotLight.distance = 1000; // Maximum range
    spotLight.castShadow = true; // Enable shadows

    const target = new three.Object3D();
    target.position.set(0, 0, 0); // Point the light at the origin
    scene.add(target);
    spotLight.target = target; // Link the light to the target

    scene.add(spotLight);

    const spotLightHelper = new three.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    spotLight.castShadow = true; 


    const shadowHelper = new three.CameraHelper(spotLight.shadow.camera);
    scene.add(shadowHelper);



    

}