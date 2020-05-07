var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);



var renderer = new THREE.WebGLRenderer( { alpha: true });
document.getElementById("canvas").appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xF0F0F0,0.1);//0xF0F0F0

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ 
  color: 0xC0C0C0,//0x00ff00, 
  wireframe: true,
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 1;

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize);

function render(time) {
    time *= 0.0001;
    cube.rotation.x = time;
    cube.rotation.y = time;
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}
render();




