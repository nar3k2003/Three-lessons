<template>
  <div>
    <h1>Documentation Testing</h1>
    <div id="threejs-container" ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  Vector3,
  BufferAttribute,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const container = ref()

onMounted(() => {
  const scene = new Scene()

  const points = [
    new Vector3(-1, 0, 0),
    new Vector3(0, 1, 0),
    new Vector3(1, 0, 0),
    new Vector3(0, -1, 0),
    new Vector3(-1, 0, 0),
  ]

  const geometry = new BufferGeometry().setFromPoints(points)

  const MAX_POINTS = 1500
  const positions = new Float32Array(MAX_POINTS * 3)
  geometry.setAttribute('position', new BufferAttribute(positions, 3))

  const material = new LineBasicMaterial({ color: 'white' })
  const line = new Line(geometry, material)

  // Generate random positions
  let x = 0,
    y = 0,
    z = 0
  const positionAttribute = line.geometry.getAttribute('position')
  for (let i = 0; i < positionAttribute.count; i++) {
    positionAttribute.setXYZ(i, x, y, z)
    x = Math.random() * 5
    y = Math.random() * 5
    z = Math.random() * 5
  }

  scene.add(new AxesHelper(5), line)

  const camera = new PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth - 50, window.innerHeight - 50)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  if (container.value) {
    container.value.appendChild(renderer.domElement)
  }

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.rotateSpeed = 0.5

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth - 50, window.innerHeight - 50)
  })

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    renderer.render(scene, camera)
  }

  animate()
})
</script>

<style scoped>
#threejs-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
