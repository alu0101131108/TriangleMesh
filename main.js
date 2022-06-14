import * as THREE from 'https://cdn.skypack.dev/three@v0.138.0';
import Stats from './Stats.js';
import {TriangleMesh} from './old-TriangleMesh.js';

let camera, scene, renderer, stats;

init();
animate();

function init() {

  // Camera
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.y = 400;

  // Scene
  scene = new THREE.Scene();

  // Lights
  const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
  scene.add( ambientLight );
  const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( pointLight );
  scene.add( camera );

  // Material
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide });

  // Mesh creation;
  const geometry = new THREE.BufferGeometry();

  const vertices = new Float32Array( [
    100.0,  100.0,  0.0,  // 0
    -100.0, -100.0,  0.0, // 1
    -100.0,  100.0,  0.0, // 2
    100.0, -100.0,  0.0,  // 3
  ] );
  geometry.setAttribute( 'position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex([0, 1, 2, 0, 3, 1]);

  // const triangleMesh = new TriangleMesh({x: 0, y: 0, z: 0}, 200, 3000);
  // geometry.setAttribute('position', new THREE.BufferAttribute(triangleMesh.getPositions(), 3));
  // geometry.setIndex(triangleMesh.getIds());

  // const geometry = new TriangleMesh({
  //   x: 0,
  //   y: 0,
  //   z: 0,
  //   width: 200,
  //   height: 200,
  //   lateralSegments: 10
  // });
  // geometry.computeVertexNormals();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  // Renderer
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );

  // Stats and onWindowResize
  stats = new Stats();
  document.body.appendChild( stats.dom );
  window.addEventListener( 'resize', onWindowResize );
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
  requestAnimationFrame( animate );

  render();
  stats.update();
}

function render() {
  const timer = Date.now() * 0.00001;

  camera.position.x = 0;
  camera.position.z = 100;

  camera.lookAt( scene.position );

  scene.traverse(( object ) => {
    if ( object.isMesh === true ) {
      // object.lookAt( camera.position );
      object.rotation.x = timer * 10;
      object.rotation.z = timer * 5;
    }
  });

  // for (let i = 0; i < vertices.length; i++) {
  //   if (i == 2 || i == 5 || i == 8 || i == 11) continue;
  //   vertices[i] += 1;
  // }
  // geometry.setAttribute( 'position', new THREE.BufferAttribute(vertices, 3));

  renderer.render( scene, camera );
}