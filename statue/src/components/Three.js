'use client'

import * as three from 'three'
import { React, useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';



function Three() {

    const sceneRef = useRef();
    
    useEffect(()=>{
    
        const scene = new three.Scene();
        const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new three.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop( animate );

        sceneRef.current.appendChild(renderer.domElement);

        // Ambient Light
        const ambientLight = new three.AmbientLight( 0x404040, 4 ); 
        scene.add( ambientLight );




        const pointLight = new three.PointLight( 0xff0000, 10, 100 );
        pointLight.position.set( 0, 1, 0 );
        scene.add( pointLight );



        //  Cube
        const geometry = new three.BoxGeometry( 1, 1, 1 );
        const material = new three.MeshStandardMaterial( { color: 0xffffff } );
        const cube = new three.Mesh( geometry, material );
        scene.add( cube );



        //  Grid helper - XZ
        const gridHelperXZ = new three.GridHelper(10, 10); // 10x10 grid with 10 divisions
        scene.add(gridHelperXZ);


        //  Grid helper - XY
        const gridHelperXY = new three.GridHelper(10, 10);
        gridHelperXY.rotation.x = Math.PI / 2; // Rotate by 90 degrees to show on XZ plane
        scene.add(gridHelperXY);
        
        
        // Orbit control
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true; // Smooth movement
        controls.dampingFactor = 0.05; // Adjust for responsiveness
        controls.screenSpacePanning = true; // Allow panning
        controls.minDistance = 1; // Clamp zoom distance
        controls.maxDistance = 500;
    
        camera.position.z = 5;

        function animate() {

            // cube.rotation.x += 0.01;
            // cube.rotation.y += 0.01;

            renderer.render( scene, camera );

        }
    })    


    



  return (
    <>
        <div ref={sceneRef} className="three-scene-container"></div>
    
    </>
)
}

export default Three
