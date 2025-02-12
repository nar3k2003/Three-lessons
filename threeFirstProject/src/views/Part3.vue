<template>
  <div>
    <h1>Part 3</h1>
    <div id="threejs-container" ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Scene,
  Mesh,
  // BoxGeometry,
  // MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  OrthographicCamera,
  AxesHelper,
  // BufferGeometry,
  // BufferAttribute,
  SphereGeometry,
  PointLight,
  AmbientLight,
  // MeshLambertMaterial,
  // MeshPhongMaterial,
  // TorusKnotGeometry,
  // Color,
  MeshStandardMaterial,
  // Group,
  TextureLoader,
  SRGBColorSpace,
  Plane,
  // Fog,
  // Color
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const container = ref()

onMounted(() => {
  const scene = new Scene()
  // Materials
  // const material = new MeshLambertMaterial()
  // const materialStandart = new MeshStandardMaterial()
  // const materialPhong = new MeshPhongMaterial()
  const textureLoader = new TextureLoader()

  // load the grass textures
  const grassAlbedo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png')
  grassAlbedo.colorSpace = SRGBColorSpace
  const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png')
  const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png')
  const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png')
  const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png')
  const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png')

  const grassMaterial = new MeshStandardMaterial();
  grassMaterial.map = grassAlbedo
  grassMaterial.roughnessMap = grassRoughness
  grassMaterial.metalnessMap = grassMetallic
  grassMaterial.normalMap = grassNormal
  grassMaterial.displacementMap = grassHeight
  grassMaterial.displacementScale = 0.1
  grassMaterial.aoMap = grassAo

  const sphereGeometry = new SphereGeometry(0.5, 20, 20)
  const sphereMesh = new Mesh(sphereGeometry, grassMaterial)

  const planeGeometry = new Plane(1, 1)
  const plane = new Mesh(planeGeometry, grassMaterial)

  sphereMesh.position.set(-1, -1, 3)

  // Light
  const light = new AmbientLight('white', 0.1)
  scene.add(light)

  const pointLight = new PointLight('white', 20)
  pointLight.position.set(0, 0, 5)
  scene.add(pointLight)


  scene.add(
    sphereMesh,
    plane
  )

  // Axes
  const axesHelper = new AxesHelper(3)
  scene.add(axesHelper)

  const aspectRatio = window.innerWidth / window.innerHeight

  // Cameras
  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000)
  camera.position.z = 5

  const ortCamera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
  ortCamera.position.z = 5

  // Render
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

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.rotateSpeed = 0.5

  controls.update()

  function animate() {
    requestAnimationFrame(animate)
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
</style>
