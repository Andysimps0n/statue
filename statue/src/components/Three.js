'use client'

import * as three from 'three'
import { React, useEffect, useState, useRef } from 'react'
import Script from 'next/script'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';


function Three() {

    const sceneRef = useRef();
    
    useEffect(()=>{
    
        const isOnPhone = window.innerWidth <= 700 ? true : false;

        let offsetX = 0;
        // let isOrbit = true
        let isOrbit = false

        // Init
        const scene = new three.Scene();
        const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new three.WebGLRenderer({ antialias: true });
        renderer.setSize( window.innerWidth, window.innerHeight);
        renderer.setAnimationLoop( animate );
        sceneRef.current.appendChild(renderer.domElement);
        camera.position.z = 7;
        camera.position.y = 10;
        camera.position.x = isOnPhone ? -7 : 0;
        // camera.rotation.x = 0.05;
        camera.rotation.x = 0
        // scene.background = new three.Color(0x87CEEB); // Light blue


        // Ambient Light
        const ambientLight = new three.AmbientLight( 0xffffff, 0.1 ); 
        scene.add( ambientLight );

        // Point Lights
        const dynamicPointLight = new three.PointLight( 0xffffff, 50, 100 );
        dynamicPointLight.position.set( offsetX, 1, 5 );

        const staticPointLightJon = new three.PointLight( 0xffffff, 40, 100 )
        // const staticPointLightJon = new three.HemisphereLight( 0xffffff, 0x454545, 0.5 )
        staticPointLightJon.position.set( 6, 2, 0 );

        const JonSpotLight = new three.SpotLight( 0xffffff, 350, 60, Math.PI / 7)
        JonSpotLight.position.set( 6 , 23, 5 );

        const JonSpotLightTarget = new three.Object3D();
        JonSpotLightTarget.position.set(6, 0, 0); // The point it looks at
        scene.add(JonSpotLightTarget);
        JonSpotLight.target = JonSpotLightTarget;

        const titleLight = new three.RectAreaLight(0xfff942, 0.3, 30,30)
        titleLight.position.set( -20 , 9, 3 );
        titleLight.lookAt(0, 10, 0);    
        scene.add(titleLight);

        const rectLightHelper = new RectAreaLightHelper(titleLight);
        scene.add(rectLightHelper);


        const staticPointLightMartin = new three.PointLight( 0xffffff, 40, 100 )
        staticPointLightMartin.position.set( 32, 2, 0 );

        const staticPointLightSa = new three.PointLight( 0xffffff, 40, 100 )
        staticPointLightSa.position.set( 58, 2, 0 );


        // Plane
        const planeGeometry = new three.BoxGeometry( 160, 0.1, 15 );
        const material = new three.MeshStandardMaterial( { color: 0xffffff } );


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

        scene.add( wall );



        // Loding Jon hus
        const gltfLoader = new GLTFLoader();
        gltfLoader.load('../models/3d_jon.gltf', (glftScene)=> {
            const model = glftScene.scene;
            
            model.traverse((e)=>{
                e.material = new three.MeshPhongMaterial ({ color: 0xffffff });
                e.material.roughness = 0.1;

            })
            
            glftScene.scene.position.x = 3
            glftScene.scene.position.z = -2
            glftScene.scene.scale.set(3,3,3)
            scene.add(glftScene.scene)
        });

        // Loding Martin
        gltfLoader.load('../models/3d_martin.gltf', (glftScene)=> {
            const model = glftScene.scene;
            
            model.traverse((e)=>{
                e.material = new three.MeshPhongMaterial({ color: 0xffffff });
                e.material.shininess = 100
            })
            
            glftScene.scene.position.x = 30
            glftScene.scene.position.z = -2
            glftScene.scene.scale.set(3,3,3)
            scene.add(glftScene.scene)
        });
        

        // Loading Sabona
        gltfLoader.load('../models/3d_sa.gltf', (glftScene)=> {
            const model = glftScene.scene;
            
            model.traverse((e)=>{
                e.material = new three.MeshPhongMaterial({ color: 0xffffff });
            })
            
            glftScene.scene.position.x = 55
            glftScene.scene.position.z = -2
            glftScene.scene.scale.set(3,3,3)
            scene.add(glftScene.scene)
        });
        
        


        // Loading custom fonts 
        const fontLoader = new FontLoader();

        fontLoader.load('../famog.json', (font)=>{
            const titleFontGeometry = new TextGeometry('Reminiscence of\nThe Reformation', {
                font : font,
                size : isOnPhone ? 0.8 : 1,
                height : 3,
            });
            
            const subtitleFontGeometryText = isOnPhone ? 'With Luther Monument \nfrom Lutherdenkmal, Worms.' :  'With Luther Monument from Lutherdenkmal, Worms.';
            const subtitleFontGeometry = new TextGeometry(subtitleFontGeometryText, {
                font : font,
                size : 0.5,
                height : 3,
            });

            const nameTextGeometry = new TextGeometry('Andy Kim', {
                font : font,
                size : 0.5,
                height : 3,
            });


            const titleTextMesh = new three.Mesh(titleFontGeometry, [ new three.MeshBasicMaterial({color : 0x00379c }) ])
            const subtitleTextMesh = new three.Mesh(subtitleFontGeometry, [ new three.MeshBasicMaterial({color : 0x00379c }) ])
            const nameTextMesh = new three.Mesh(nameTextGeometry, [ new three.MeshBasicMaterial({color : 0x00379c }) ])
            
            titleTextMesh.position.z = -4
            titleTextMesh.position.y = 12
            titleTextMesh.position.x = -10
            titleTextMesh.rotation.x = 0.1
            scene.add(titleTextMesh)
            
            
            subtitleTextMesh.position.z = -4
            subtitleTextMesh.position.y = 8.5
            subtitleTextMesh.position.x = -9.6
            subtitleTextMesh.rotation.x = 0.1
            scene.add(subtitleTextMesh)

            
            nameTextMesh.position.z = -4
            nameTextMesh.position.y = isOnPhone ? 6 : 7;
            nameTextMesh.position.x = -9.6
            nameTextMesh.rotation.x = 0.1
            scene.add(nameTextMesh)

            
            

            
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

            const jonTitleTextMesh = new three.Mesh(jonTitleFontGeometry, [ new three.MeshBasicMaterial ({color : 0xffffff }) ])
            const jonSubtitleTextMesh = new three.Mesh(jonSubtitleFontGeometry, [ new three.MeshBasicMaterial ({color : 0xffffff }) ])
            
            jonTitleTextMesh.position.z = -5.2
            jonTitleTextMesh.position.y = 0.8
            jonTitleTextMesh.position.x = 7
            jonTitleTextMesh.rotation.x = -0.2

            jonSubtitleTextMesh.position.z = -5.2
            jonSubtitleTextMesh.position.y = -0.0
            jonSubtitleTextMesh.position.x = 6.9
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

            const martinTitleTextMesh = new three.Mesh(martinTitleFontGeometry, [ new three.MeshBasicMaterial({color : 0xffffff }) ])
            const martinSubtitleTextMesh = new three.Mesh(martinSubtitleFontGeometry, [ new three.MeshBasicMaterial({color : 0xffffff }) ])
            
            martinTitleTextMesh.position.z = -5.2
            martinTitleTextMesh.position.y = 0.8
            martinTitleTextMesh.position.x = 33
            martinTitleTextMesh.rotation.x = -0.2
            
            martinSubtitleTextMesh.position.z = -5.2
            martinSubtitleTextMesh.position.y = -0.0
            martinSubtitleTextMesh.position.x = 33
            martinSubtitleTextMesh.rotation.x = -0.1
            
            scene.add(martinSubtitleTextMesh)
            scene.add(martinTitleTextMesh)
            

            
            // Sa
            const SaTitleFontGeometry = new TextGeometry('Girolamo Savonarola', {
                font : font,
                size : 0.7,
                height : 3,
            });

            const SaSubtitleFontGeometry = new TextGeometry("Girolamo Savonarola was anreformer who opposed \ncorruption in religious spheres. Despite papal restraints, \nhe continued his reforms until his eventual execution.", {
                font : font,
                size : 0.4,
                height : 3,
            });

            const saTitleTextMesh = new three.Mesh(SaTitleFontGeometry, [ new three.MeshBasicMaterial({color : 0xffffff }) ])
            const SaSubtitleTextMesh = new three.Mesh(SaSubtitleFontGeometry, [ new three.MeshBasicMaterial({color : 0xffffff }) ])
            
            saTitleTextMesh.position.z = -5.2
            saTitleTextMesh.position.y = 0.8
            saTitleTextMesh.position.x = 58
            saTitleTextMesh.rotation.x = -0.2
            
            SaSubtitleTextMesh.position.z = -5.2
            SaSubtitleTextMesh.position.y = -0.0
            SaSubtitleTextMesh.position.x = 58
            SaSubtitleTextMesh.rotation.x = -0.1
            
            scene.add(SaSubtitleTextMesh)
            scene.add(saTitleTextMesh)
            

            scene.add( staticPointLightJon ); 
            
            
            
            
            
        })
        
        
        // Orbit control
        if (isOrbit) {
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; // Smooth movement
            controls.dampingFactor = 0.05; // Adjust for responsiveness
            controls.screenSpacePanning = true; // Allow panning
            

        }
        console.log(camera.position.x);
        

        let positionConstant = 0.2
        let cameraMinYRotationX = isOnPhone ? 3 : 2
        // On Mouse wheel 
        const handleWheel = (event) => {
            if (event.deltaY > 0 && camera.position.y > cameraMinYRotationX) {
                camera.position.y -= positionConstant; 
                {camera.rotation.x >= -0.4 ? camera.rotation.x -= 0.01 : null}

            } else if (event.deltaY < 0 && camera.position.x  < 0.1 && camera.rotation.x <= 0.03) {
                camera.position.y += positionConstant; 
                camera.rotation.x += 0.01
                // {camera.rotation.x <= -0.4 ? camera.rotation.x += 0.01 : null}                
            }
            else if (event.deltaY < 0 && camera.position.x > 0) {
                camera.position.x -= positionConstant; 

            } else if (event.deltaY > 0 && camera.position.x < 60) {
                camera.position.x += positionConstant;
                console.log(camera.position.x, camera.position.y);
            }


            // Lights on distance
            if ((1 < camera.position.x )) {
                scene.add( staticPointLightJon ); 
                scene.remove(staticPointLightMartin)
                scene.remove(staticPointLightSa)
            }
            
            if (18 < camera.position.x){
                scene.remove(staticPointLightJon)
                scene.remove(staticPointLightSa)
                scene.add(staticPointLightMartin)
            } if (44 < camera.position.x) {
                scene.remove(staticPointLightJon)
                scene.remove(staticPointLightMartin)
                scene.add(staticPointLightSa)
            }
        };
        window.addEventListener('wheel', handleWheel);
        let startY = 0;

        function handleTouchStart(event) {
        startY = event.touches[0].clientY;
        }

        function handleTouchMove(event) {
        const currentY = event.touches[0].clientY;
        const deltaY = startY - currentY;

        if (deltaY > 0) {
            console.log('Swiped up');
            // Handle swipe up
        } else if (deltaY < 0) {
            console.log('Swiped down');
            // Handle swipe down
        }

        startY = currentY; // Update startY for smoother interactions
        }

        // Add event listeners
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);
        
        function animate() {
            renderer.render( scene, camera );
        }
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
