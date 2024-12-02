import * as three from 'three';


export default function shapes(scene) {


    // Plane
    const planeGeometry = new three.BoxGeometry( 700, 0.1, 700 );
    const material = new three.MeshToonMaterial ( { color: 0x6eff83 } );
    const plane1 = new three.Mesh( planeGeometry, material );
    plane1.receiveShadow = true
    plane1.position.y = -3
    plane1.position.z = -2
    plane1.position.x = 6
    scene.add( plane1 );


    // Wall
    const wallGeometry = new three.BoxGeometry( 160, 50, 0.1 );
    const wall = new three.Mesh( wallGeometry, material );
    wall.receiveShadow = true
    wall.position.y = 1
    wall.position.x = 6
    wall.position.z = -6
    // scene.add( wall );
}