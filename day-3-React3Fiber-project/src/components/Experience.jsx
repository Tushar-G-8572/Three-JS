import React from 'react'
import { useControls } from 'leva'
import FanGallery from './FanGallery'
import { OrbitControls } from '@react-three/drei'

const Experience = () => {

  // const {x,y,z,visible,color} = useControls("Box-position",{
  //   x: {value:0,min:-4,max:4,step:0.01, label:'X-position'},
  //   y: {value:0,min:-4,max:4,step:0.01},
  //   z: {value:0,min:-4,max:4,step:0.01},
  //   visible:true,
  //   color:{value:'red'}
  // })

  // return (
  //   <mesh position={[x,y,z]}>
  //    <boxGeometry />
  //    <meshBasicMaterial color={'red'} />
  //   </mesh>
  // )

  return (
    <>
    <ambientLight intensity={2} color={'#ffffff'} />
    <FanGallery />
    <OrbitControls />
    </>
  )
}

export default Experience