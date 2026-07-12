import { Environment, Instance, Instances, useGLTF, useTexture } from '@react-three/drei';
import { useFrame, useLoader } from '@react-three/fiber'
import React, { useRef } from 'react'
import * as THREE from 'three';

const Experience = () => {
 const cubeRef = useRef(null);

 useFrame((state,delta)=>{
  // console.log(state);
  // cubeRef.current.rotation.y += delta
 })

 const handleClick = () => {
  if (!cubeRef.current) return;
  const material = cubeRef.current.material;
  if (material && material.color) material.color.set('green');
 } 

 const {scene} = useGLTF('./robot.glb');

 const drieTexture = useTexture('https://images.unsplash.com/photo-1777720871398-ee7a22a72f78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D')

 const {matcap,texture1} = useTexture({
  matcap: './matCap.jpg',
  texture1:'https://images.unsplash.com/photo-1777720871398-ee7a22a72f78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D'
 })

 // const texture = useLoader(THREE.TextureLoader,"https://images.unsplash.com/photo-1777720871398-ee7a22a72f78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D")
  return (
    <>
    {/* <mesh onClick={handleClick} ref={cubeRef}> */}
     {/* <boxGeometry /> */}
     {/* <meshBasicMaterial map={drieTexture} /> */}
    {/* <meshStandardMaterial color={'red'} metalness={0.9} roughness={0.1} /> */}
    {/* </mesh> */}
    {/* <ambientLight intensity={2} color={'#ffffff'} />
    <primitive object={scene} position={[0,-2,0]} /> */}
    {/* <Environment files='./envMap.hdr' /> */}
    <Instances>
     <torusKnotGeometry />
     <meshMatcapMaterial matcap={matcap}  />
     {Array.from({length:200}).map((_,id)=>{
      return (
       <Instance key={id} position={[Math.random()*50 -25,Math.random()*50 -25, Math.random()*50 -25]} />
      )
     })}
    </Instances>
    </>
  )
}

export default Experience