var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 10);



var renderer = new THREE.WebGLRenderer( { alpha: true });
document.getElementById("canvas").appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xF0F0F0,0.1);//0xF0F0F0

// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshBasicMaterial({ 
//   color: 0xC0C0C0,//0x00ff00, 
//   wireframe: true,
// });
// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

let stars, starGeo;


starGeo = new THREE.Geometry();
for(let i=0;i<25000;i++) {
  star = new THREE.Vector3(
    Math.random() * 60-30,
    Math.random() * 60-30,
    Math.random() * 60-30
  );
  star.velocity = 0;
  star.acceleration = -0.002;
  starGeo.vertices.push(star);
}

let sprite = new THREE.TextureLoader().load( "assets/img/star.png" );
let starMaterial = new THREE.PointsMaterial({
  color: 0x171717,
  size: 0.1,
  map: sprite
});

stars = new THREE.Points(starGeo,starMaterial);
scene.add(stars);
animate(); 



camera.position.z = 1;

function onResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', onResize);

function render(time) {
    time *= 0.0001;
    // cube.rotation.x = time;
    // cube.rotation.y = time;
	renderer.render(scene, camera);
	requestAnimationFrame(render);
}

function animate() {
  starGeo.vertices.forEach(p => {
    p.velocity -= p.acceleration
    p.z -= p.velocity;
    
    // if (p.z < -200) {
    //   p.z = 200;
    //   p.velocity = 0;
    // }
  });
  starGeo.verticesNeedUpdate = true;
  // stars.rotation.y +=0.0002;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

render();
