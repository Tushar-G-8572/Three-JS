import './index.css'
import * as THREE from 'three';

// scene
const scene = new THREE.Scene()

// Camera
const camera = new THREE.PerspectiveCamera(
  75,   // angle of eyesight fov
  window.innerWidth/window.innerHeight, //  screen width / height (pure screen ko camera dekhe)
  0.01,  // camera or object ki doori 0.01 se pass hai to object nhi dikhega < 0.01
  100 // camera or object ki doori 100 se door hai to object nhi dikhega >100
);

camera.position.z = 3

//  Mesh -> Geometry
const geometry = new THREE.BoxGeometry(1,1,1) // width,height,depth
const material = new THREE.MeshBasicMaterial({
  color:"red"
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
renderer.setSize(window.innerWidth,window.innerHeight);

// start projector
// renderer.render(scene,camera);

function animate (){
  cube.rotation.y += 0.03
  cube.rotation.x += 0.03
  renderer.render(scene,camera);
  window.requestAnimationFrame(animate);
}

animate()