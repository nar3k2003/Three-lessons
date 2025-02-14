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
  BoxGeometry,
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
  TorusKnotGeometry,
  // Color,
  MeshStandardMaterial,
  // Group,
  TextureLoader,
  SRGBColorSpace,
  PlaneGeometry,
  RepeatWrapping,
  DoubleSide,
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

  const texture = textureLoader.load('/textures/uvMappingTest.jpg')
  const textMaterial = new MeshStandardMaterial()
  textMaterial.map = texture

  // load the grass textures
  const grassAlbedo = textureLoader.load(
    '/textures/whispy-grass-meadow-bl/wispy-grass-meadow_albedo.png',
  )
  grassAlbedo.colorSpace = SRGBColorSpace
  const grassAo = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_ao.png')
  const grassHeight = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_height.png')
  const grassMetallic = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_metallic.png')
  const grassNormal = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_normal-ogl.png')
  const grassRoughness = textureLoader.load('/textures/whispy-grass-meadow-bl/wispy-grass-meadow_roughness.png')

  const grassMaterial = new MeshStandardMaterial()
  grassMaterial.map = grassAlbedo
  grassMaterial.roughnessMap = grassRoughness
  grassMaterial.metalnessMap = grassMetallic
  grassMaterial.normalMap = grassNormal
  grassMaterial.displacementMap = grassHeight
  grassMaterial.displacementScale = 0.1
  grassMaterial.aoMap = grassAo

  const boulderAlbedo = textureLoader.load(
    '/textures/badlands-boulders-bl/badlands-boulders_albedo.png',
  )
  boulderAlbedo.colorSpace = SRGBColorSpace
  const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
  const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
  const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png')
  const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
  const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')

  const boulderMaterial = new MeshStandardMaterial()
  boulderMaterial.side = DoubleSide
  boulderMaterial.map = boulderAlbedo
  boulderMaterial.roughnessMap = boulderRoughness
  boulderMaterial.metalnessMap = boulderMetallic
  boulderMaterial.normalMap = boulderNormal
  boulderMaterial.displacementMap = boulderHeight
  boulderMaterial.displacementScale = 0.1
  boulderMaterial.aoMap = boulderAo

  const cubeGeometry = new BoxGeometry(1, 1, 1, 3, 3, 3)
  const cubeMesh = new Mesh(cubeGeometry, textMaterial)

  cubeMesh.position.y = 1
  cubeMesh.position.set(2, 1, 0)
  cubeMesh.scale.setScalar(0.5)

  const torusKnotGiometry = new TorusKnotGeometry(0.5, 0.15, 100, 16)
  const torusKnotMesh = new Mesh(torusKnotGiometry, textMaterial)
  torusKnotMesh.position.set(-2, 1, 0)

  const sphereGeometry = new SphereGeometry(0.5, 20, 20)
  const sphereMesh = new Mesh(sphereGeometry, textMaterial)
  sphereMesh.position.set(0, 1, 0)

  const planeGeometry = new PlaneGeometry(1, 1)
  const plane = new Mesh(planeGeometry, boulderMaterial)
  plane.position.set(0, 0, 0)

  plane.rotation.x = Math.PI * -0.5
  plane.scale.set(100, 100)
  grassAlbedo.repeat.set(10, 10)
  grassAo.repeat.set(10, 10)
  grassHeight.repeat.set(10, 10)
  grassMetallic.repeat.set(10, 10)
  grassNormal.repeat.set(10, 10)
  grassRoughness.repeat.set(10, 10)

  grassAlbedo.wrapS = RepeatWrapping
  grassAo.wrapS = RepeatWrapping
  grassHeight.wrapS = RepeatWrapping
  grassMetallic.wrapS = RepeatWrapping
  grassNormal.wrapS = RepeatWrapping
  grassRoughness.wrapS = RepeatWrapping

  grassAlbedo.wrapT = RepeatWrapping
  grassAo.wrapT = RepeatWrapping
  grassHeight.wrapT = RepeatWrapping
  grassMetallic.wrapT = RepeatWrapping
  grassNormal.wrapT = RepeatWrapping
  grassRoughness.wrapT = RepeatWrapping

  boulderAlbedo.repeat.set(10, 10)
  boulderAo.repeat.set(10, 10)
  boulderHeight.repeat.set(10, 10)
  boulderMetallic.repeat.set(10, 10)
  boulderNormal.repeat.set(10, 10)
  boulderRoughness.repeat.set(10, 10)

  boulderAlbedo.wrapS = RepeatWrapping
  boulderAo.wrapS = RepeatWrapping
  boulderHeight.wrapS = RepeatWrapping
  boulderMetallic.wrapS = RepeatWrapping
  boulderNormal.wrapS = RepeatWrapping
  boulderRoughness.wrapS = RepeatWrapping

  boulderAlbedo.wrapT = RepeatWrapping
  boulderAo.wrapT = RepeatWrapping
  boulderHeight.wrapT = RepeatWrapping
  boulderMetallic.wrapT = RepeatWrapping
  boulderNormal.wrapT = RepeatWrapping
  boulderRoughness.wrapT = RepeatWrapping

  // Light
  const light = new AmbientLight('white', 1)
  scene.add(light)

  const pointLight = new PointLight('white', 10)
  pointLight.position.set(0, 0, 3)
  scene.add(pointLight)

  scene.add(sphereMesh, plane, cubeMesh, torusKnotMesh)

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

body {
  background-color: black;
}
</style>
