<template>
  <div>
    <h1>Hello Cube</h1>
    <div id="threejs-container" ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Scene,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  OrthographicCamera,
  AxesHelper,
  Group,
  Clock,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const container = ref()

onMounted(() => {
  const scene = new Scene()

  const cubeGeometry = new BoxGeometry(1, 1, 1)
  const cubeMaterial = new MeshBasicMaterial({ color: 'green', wireframe: true })
  const cubeMesh1 = new Mesh(cubeGeometry, cubeMaterial)
  const cubeMesh2 = new Mesh(cubeGeometry, cubeMaterial)
  const cubeMesh3 = new Mesh(cubeGeometry, cubeMaterial)

  cubeMesh1.position.y = 1
  cubeMesh1.scale.setScalar(0.5)

  // cubeMesh2.rotation.reorder('XZY')

  const group = new Group()
  group.add(cubeMesh1)
  group.add(cubeMesh2)
  group.add(cubeMesh3)

  group.position.y = 0.125
  group.scale.setScalar(0.5)

  scene.add(group)

  // cubeMesh1.position.x = 0
  // cubeMesh1.position.y = 0
  // cubeMesh1.position.z = 0

  // cubeMesh2.position.x = 1
  // cubeMesh2.position.y = 0
  // cubeMesh2.position.z = 0

  // cubeMesh3.position.x = -1
  // cubeMesh3.position.y = 0
  // cubeMesh3.position.z = 0

  cubeMesh1.position.set(0, 0, 0)
  cubeMesh2.position.set(1, 1, 0)
  cubeMesh3.position.set(-1, 0.5, 0)

  // cubeMesh1.scale.x = 0.5
  // cubeMesh1.scale.y = 0.5
  // cubeMesh1.scale.z = 0.5

  cubeMesh1.scale.set(0.5, 0.5, 0.5)
  cubeMesh2.scale.set(0.5, 0.5, 0.5)
  cubeMesh3.scale.set(0.5, 0.5, 0.5)

  const axesHelper = new AxesHelper(2)
  scene.add(axesHelper)

  const axesHelperCube = new AxesHelper(2)
  cubeMesh2.add(axesHelperCube)

  const aspectRatio = window.innerWidth / window.innerHeight

  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000)
  camera.position.z = 5

  const ortCamera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
  ortCamera.position.z = 5

  const renderer = new WebGLRenderer()

  if (container.value) {
    container.value.appendChild(renderer.domElement)
  }
  renderer.setSize(window.innerWidth - 50, window.innerHeight - 50)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  window.addEventListener('resize', () => {
    camera.aspect = aspectRatio
    camera.updateProjectionMatrix
  })

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  // controls.dampingFactor = 0.05;
  controls.rotateSpeed = 0.5

  controls.update()
  const Rad = ref(0)

  const clock = new Clock()

  function animate() {
    requestAnimationFrame(animate)

    const currentTime = clock.getElapsedTime()
    // const delta = currentTime - Rad.value
    Rad.value = currentTime
    // console.log('currentTime: ', currentTime)

    // Rad.value += 0.01
    // cubeMesh2.rotation.y = Math.PI * Rad.value
    // cubeMesh2.rotation.y += MathUtils.degToRad(1) * delta * 4
    // cubeMesh2.rotation.y = MathUtils.degToRad(Rad.value)
    // cubeMesh2.rotation.z = MathUtils.degToRad(Rad.value)

    cubeMesh2.scale.x = Math.sin(currentTime) * 2 + 3

    // cubeMesh.rotation.x += 0.01;
    // cubeMesh.rotation.y += 0.01;
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
});
</script>

<style scoped>
#threejs-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
template{
  background-color: black;
}
</style>
