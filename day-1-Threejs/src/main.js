import './index.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const size = {
  width : window.innerWidth,
  height: window.innerHeight
}

// scene
const scene = new THREE.Scene()
const clock = new THREE.Clock()

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('https://images.unsplash.com/photo-1782392455081-a09db8267afb?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
()=>{
  console.log('texture loaded')
},
()=>{
  console.log('texture loaded')
},
()=>{
  console.log('Some error occur')
}
);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,   // angle of eyesight fov
  size.width/size.height, //  screen width / height (pure screen ko camera dekhe)
  0.01,  // camera or object ki doori 0.01 se pass hai to object nhi dikhega < 0.01
  100 // camera or object ki doori 100 se door hai to object nhi dikhega >100
);

camera.position.z = 3

// light

const ambientLight = new THREE.AmbientLight('white',.5)

scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('white',3.2)
directionalLight.position.set(1,1,1)
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper)

//  Mesh -> Geometry
const geometry = new THREE.BoxGeometry(1,1,1) // width,height,depth
// const material = new THREE.MeshBasicMaterial({
//   // map:texture
//   color:'red'
// })

const material = new THREE.MeshStandardMaterial({
  color:'red'
})

const cube = new THREE.Mesh(geometry,material);

// adding actor in scene

scene.add(cube);

//  Canvas (parda)

const canvas = document.querySelector('canvas');

//  projector
const renderer = new THREE.WebGLRenderer({
  canvas:canvas,

})

// cube.rotation.y = 1.05
// cube.rotation.x = 1.05

// projector size
renderer.setSize(size.width,size.height);

// start projector
// renderer.render(scene,camera);

window.addEventListener('resize',function(){  // resize krne pr box ki position bhi update ho
  size.width = window.innerWidth,
  size.height = window.innerHeight

  camera.aspect = size.width/size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height)
})

const controls = new OrbitControls(camera,renderer.domElement) // adding controls to 
controls.enableDamping = true

function animate (){
  const delta = clock.getElapsedTime(); // time sbme same hota hai to sbme animation same time pr chle
  // console.log(delta)

  cube.rotation.y = delta;

  controls.update();
  cube.rotation.x = delta*0.8
  renderer.render(scene,camera);
  window.requestAnimationFrame(animate);
}

animate()

// transformation -> position (x,y,z), rotation(x,y,z), scale(x,y,z)
// position cube.position.set(1.5,-1.2,-1.2)