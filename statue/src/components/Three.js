'use client'

import * as three from 'three'
import { React, useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

function Three() {

    const sceneRef = useRef();
    
    useEffect(()=>{
    
        let offsetX = 20;

        // Init
        const scene = new three.Scene();
        const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new three.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop( animate );
        sceneRef.current.appendChild(renderer.domElement);
        camera.position.z = 7;
        camera.position.y = 2;
        camera.position.x = offsetX;
        camera.rotation.x = -0.4;
        // scene.background = new three.Color(0x87CEEB); // Light blue


        // Ambient Light
        const ambientLight = new three.AmbientLight( 0xffffff, 0.2 ); 
        scene.add( ambientLight );

        // Point Lights
        const dynamicPointLight = new three.PointLight( 0xffffff, 70, 100 );
        dynamicPointLight.position.set( offsetX, 1, 5 );

        const staticPointLightJon = new three.PointLight( 0xffffff, 0, 100 )
        staticPointLightJon.position.set( 0, 1, 2 );

        scene.add( dynamicPointLight );
        scene.add( staticPointLightJon );


        // Plane
        const geometry = new three.BoxGeometry( 7, 0.1, 3 );
        const material = new three.MeshToonMaterial( { color: 0xffffff } );


        const plane1 = new three.Mesh( geometry, material );
        plane1.receiveShadow = true
        plane1.position.y = -1
        plane1.position.x = 6
        // scene.add( plane1 );



        // Loding Jon hus
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('../models/3d_jon.gltf', (glftScene)=> {
            const model = glftScene.scene;
            
            model.traverse((e)=>{
                e.material = new three.MeshNormalMaterial({ color: 0xffffff });
            })
            
            glftScene.scene.position.x = 6
            glftScene.scene.scale.set(3,3,3)
            scene.add(glftScene.scene)
        });

        // Loding Martin
        gltfLoader.load('../models/3d_martin.gltf', (glftScene)=> {
            const model = glftScene.scene;
            
            model.traverse((e)=>{
                e.material = new three.MeshNormalMaterial({ color: 0xffffff });
            })
            
            glftScene.scene.position.x = 24
            glftScene.scene.position.z = 1
            glftScene.scene.scale.set(3,3,3)
            scene.add(glftScene.scene)
        });
        
        


        // Loading custom fonts 
        const fontLoader = new FontLoader();

        fontLoader.load('../famog.json', (font)=>{
            const titleFontGeometry = new TextGeometry('Reminiscence of\nThe Reformation', {
                font : font,
                size : 1,
                height : 3,
            });

            const subtitleFontGeometry = new TextGeometry('Eunchan Kim', {
                font : font,
                size : 0.5,
                height : 3,
            });

            const titleTextMesh = new three.Mesh(titleFontGeometry, [ new three.MeshNormalMaterial({color : 0xffffff }) ])
            const subtitleTextMesh = new three.Mesh(subtitleFontGeometry, [ new three.MeshNormalMaterial({color : 0xa8a8a8 }) ])
            
            titleTextMesh.position.z = -4
            titleTextMesh.position.y = 0
            titleTextMesh.position.x = -10
            titleTextMesh.rotation.x = -0.4

            subtitleTextMesh.position.z = -2.5
            subtitleTextMesh.position.y = -4
            subtitleTextMesh.position.x = -9.9
            subtitleTextMesh.rotation.x = -0.4

            scene.add(subtitleTextMesh)
            scene.add(titleTextMesh)
            
            

            
            // Jon hus
            const jonTitleFontGeometry = new TextGeometry('Jan Hus', {
                font : font,
                size : 0.7,
                height : 3,
            });

            const jonSubtitleFontGeometry = new TextGeometry('Jan Hus, whose work was transitional between \n the medieval and the Reformation periods and \n anticipated the Lutheran Reformation by a full \n century. He was convicted of heresy at the  \n Council of Constance and burned at the stake.', {
                font : font,
                size : 0.4,
                height : 3,
            });

            const jonTitleTextMesh = new three.Mesh(jonTitleFontGeometry, [ new three.MeshPhongMaterial({color : 0xffffff }) ])
            const jonSubtitleTextMesh = new three.Mesh(jonSubtitleFontGeometry, [ new three.MeshPhongMaterial({color : 0xa8a8a8 }) ])
            
            jonTitleTextMesh.position.z = -3.2
            jonTitleTextMesh.position.y = 0.8
            jonTitleTextMesh.position.x = 10
            jonTitleTextMesh.rotation.x = -0.2

            jonSubtitleTextMesh.position.z = -3.2
            jonSubtitleTextMesh.position.y = -0.3
            jonSubtitleTextMesh.position.x = 9.9
            jonSubtitleTextMesh.rotation.x = -0.1

            scene.add(jonSubtitleTextMesh)
            scene.add(jonTitleTextMesh)


            // Martin luter
            const martinTitleFontGeometry = new TextGeometry('Martin Luther', {
                font : font,
                size : 0.7,
                height : 3,
            });

            const martinSubtitleFontGeometry = new TextGeometry("Martin Luther was theologian whose actions sparked \nthe Reformation, renewing Christian beliefs.This led \nto new traditions like Lutheranism, Calvinism, and others, \nmaking him one of Christianity's most influential figures.", {
                font : font,
                size : 0.4,
                height : 3,
            });

            const martinTitleTextMesh = new three.Mesh(martinTitleFontGeometry, [ new three.MeshPhongMaterial({color : 0xffffff }) ])
            const martinSubtitleTextMesh = new three.Mesh(martinSubtitleFontGeometry, [ new three.MeshPhongMaterial({color : 0xa8a8a8 }) ])
            
            martinTitleTextMesh.position.z = -3.2
            martinTitleTextMesh.position.y = 0.8
            martinTitleTextMesh.position.x = 27
            martinTitleTextMesh.rotation.x = -0.2

            martinSubtitleTextMesh.position.z = -3.2
            martinSubtitleTextMesh.position.y = -0.3
            martinSubtitleTextMesh.position.x = 27
            martinSubtitleTextMesh.rotation.x = -0.1

            scene.add(martinSubtitleTextMesh)
            scene.add(martinTitleTextMesh)






            
        })









        // On Mouse wheel 
        const handleWheel = (event) => {
            if (event.deltaY < 0 && camera.position.x > -7) {
                camera.position.x -= 0.2; 
                dynamicPointLight.position.x -= 0.2; 
            } else if (event.deltaY > 0) {
                camera.position.x += 0.2;
                dynamicPointLight.position.x += 0.2;
            }
        };
        window.addEventListener('wheel', handleWheel);
        
        function animate() {
            // camera.position.x += 0.003;
            // dynamicPointLight.position.x += 0.003;



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
