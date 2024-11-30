'use client'

import * as three from 'three'
import { React, useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


function Three() {

    const sceneRef = useRef();
    
    useEffect(()=>{
    
        let offsetX = -11;

        // Init
        const scene = new three.Scene();
        const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new three.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop( animate );
        sceneRef.current.appendChild(renderer.domElement);
        camera.position.z = 5;
        camera.position.y = 1.5;
        camera.position.x = offsetX;
        camera.rotation.x = -0.15;
        // scene.background = new three.Color(0x87CEEB); // Light blue


        // Ambient Light
        const ambientLight = new three.AmbientLight( 0xffffff, 4 ); 
        // scene.add( ambientLight );

        // Point Lights
        const dynamicPointLight = new three.PointLight( 0xffffff, 7, 100 );
        dynamicPointLight.position.set( offsetX, 1, 2 );

        const staticPointLightJon = new three.PointLight( 0xffffff, 7, 100 )
        staticPointLightJon.position.set( 0, 1, 2 );

        scene.add( dynamicPointLight );
        scene.add( staticPointLightJon );


        // Plane
        const geometry = new three.BoxGeometry( 7, 0.1, 3 );
        const material = new three.MeshToonMaterial( { color: 0xffffff } );
        const plane = new three.Mesh( geometry, material );
        plane.receiveShadow = true
        plane.position.y = -1
        scene.add( plane );



        // Loding model
        const loader = new GLTFLoader();
        loader.load('../models/3d_jon.gltf', (glftScene)=> {
            const model = glftScene.scene;
            
            model.traverse((e)=>{
                e.material = new three.MeshToonMaterial({ color: 0xffffff });
            })
            scene.add(glftScene.scene)
        });
        
        
        // Mouse wheel 
        const handleWheel = (event) => {
            if (event.deltaY < 0) {
                camera.position.x -= 0.6; 
                dynamicPointLight.position.x -= 0.6; 
            } else if (event.deltaY > 0) {
                camera.position.x += 0.6;
                dynamicPointLight.position.x += 0.6;
            }
        };
        window.addEventListener('wheel', handleWheel);
        
        function animate() {
            // camera.position.x += 0.01;
            // pointLight.position.x += 0.01;



            renderer.render( scene, camera );
        }


        // Cube
        // const geometry = new three.BoxGeometry( 1, 1, 1 );
        // const material = new three.MeshStandardMaterial( { color: 0xffffff } );
        // const cube = new three.Mesh( geometry, material );
        // scene.add( cube );


        // //  Grid helper - XZ
        // const gridHelperXZ = new three.GridHelper(10, 10); // 10x10 grid with 10 divisions
        // scene.add(gridHelperXZ);


        // //  Grid helper - XY
        // const gridHelperXY = new three.GridHelper(10, 10);
        // gridHelperXY.rotation.x = Math.PI / 2; // Rotate by 90 degrees to show on XZ plane
        // scene.add(gridHelperXY);
        
        
        // Orbit control
        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true; // Smooth movement
        // controls.dampingFactor = 0.05; // Adjust for responsiveness
        // controls.screenSpacePanning = true; // Allow panning
    })    


    



  return (
    <>
        <div className="scene-wrapper">
            <div ref={sceneRef} className="three-scene-container"></div>

        </div>
    
    </>
)
}

export default Three
