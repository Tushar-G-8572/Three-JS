import React, { useMemo } from 'react'
import * as THREE from 'three'
import {useTexture} from '@react-three/drei'

const Particles = ({planeRadius}) => {
  // const texture = useTexture('./matCap.jpg')

  const geoMetry = useMemo(()=>{
   const geo = new THREE.SphereGeometry(1)
   return geo;
  },[planeRadius]);
  return (
    <>
     <mesh geometry={geoMetry}>
      <meshBasicMaterial color={'red'} />
     </mesh>
    </>
  )
}

export default Particles