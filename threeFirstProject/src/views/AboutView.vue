<template>
  <div>
    <h1>Hello Cube</h1>
    <img
      src="../../textures/rustediron1-alt2-bl/rustediron2_basecolor.png"
      alt="texture1"
      srcset=""
      width="100px"
      height="100px"
    />
    <img
      src="../../textures/Titanium-Scuffed-bl/Titanium-Scuffed_roughness.png"
      alt="texture2"
      srcset=""
      width="100px"
      height="100px"
    />
    <img
      src="../../textures/rock-sliced-bl/rock_sliced_Base_Color.png"
      alt="texture3"
      srcset=""
      width="100px"
      height="100px"
    />
    <img
      src="../../textures/herringbone-flooring-bl/herringbone-flooring_albedo.png"
      alt="texture4"
      srcset=""
      width="100px"
      height="100px"
    />
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
  BufferGeometry,
  BufferAttribute,
  SphereGeometry,
  PointLight,
  AmbientLight,
  MeshLambertMaterial,
  MeshPhongMaterial,
  TorusKnotGeometry,
  Color,
  MeshStandardMaterial,
  // Group,
  TextureLoader,
  SRGBColorSpace

  // Fog,
  // Color
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const container = ref()

onMounted(() => {
  const scene = new Scene()
  // Materials
  const material = new MeshLambertMaterial()
  // const materialBasic = new MeshBasicMaterial()
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

  // load the boulder textures
  const boulderAlbedo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png')
  boulderAlbedo.colorSpace = SRGBColorSpace
  const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
  const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
  const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png')
  const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
  const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')

  const boulderMaterial = new MeshStandardMaterial();
  boulderMaterial.map = boulderAlbedo
  boulderMaterial.roughnessMap = boulderRoughness
  boulderMaterial.metalnessMap = boulderMetallic
  boulderMaterial.normalMap = boulderNormal
  boulderMaterial.displacementMap = boulderHeight
  boulderMaterial.displacementScale = 0.1
  boulderMaterial.aoMap = boulderAo

  // load the space cruiser textures
  const spaceCruiserAlbedo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')
  spaceCruiserAlbedo.colorSpace = SRGBColorSpace
  const spaceCruiserAo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png')
  const spaceCruiserHeight = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png')
  const spaceCruiserMetallic = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png')
  const spaceCruiserNormal = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png')
  const spaceCruiserRoughness = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png')

  const spaceCruiserMaterial = new MeshStandardMaterial();
  spaceCruiserMaterial.map = spaceCruiserAlbedo
  spaceCruiserMaterial.roughnessMap = spaceCruiserRoughness
  spaceCruiserMaterial.metalnessMap = spaceCruiserMetallic
  spaceCruiserMaterial.normalMap = spaceCruiserNormal
  spaceCruiserMaterial.displacementMap = spaceCruiserHeight
  spaceCruiserMaterial.displacementScale = 0.1
  spaceCruiserMaterial.aoMap = spaceCruiserAo


  const texture4Albedo = textureLoader.load('/textures/herringbone-flooring-bl/herringbone-flooring_albedo.png')
  const texture4Ao = textureLoader.load('/textures/herringbone-flooring-bl/herringbone-flooring_ao.png')
  const texture4Height = textureLoader.load('/textures/herringbone-flooring-bl/herringbone-flooring_height.png')
  const texture4Metallic = textureLoader.load('/textures/herringbone-flooring-bl/herringbone-flooring_metallic.png')
  const texture4Normal = textureLoader.load('/textures/herringbone-flooring-bl/herringbone-flooring_normal-ogl.png')
  const texture4Roughness = textureLoader.load('/textures/herringbone-flooring-bl/herringbone-flooring_roughness.png')
  const materialWithTexture4 = new MeshStandardMaterial({
      map: texture4Albedo,
      roughnessMap: texture4Roughness,
      metalnessMap: texture4Metallic,
      normalMap: texture4Normal,
      aoMap: texture4Ao,
      displacementMap: texture4Height,
      displacementScale: 0.1
    })

  // console.log(texture1)
  // console.log(texture2)
  // console.log(texture3)
  // console.log(texture4)

  const materialStandart = new MeshStandardMaterial()
  materialStandart.metalness = 0.1
  materialStandart.roughness = 0.1
  materialStandart.color = new Color('green')

  const materialPhong = new MeshPhongMaterial()
  materialPhong.shininess = 900
  materialPhong.color = new Color('red')

  // const cubeMaterial = new MeshBasicMaterial({
  //   color: 'green',
  //   // wireframe: true,
  //   // transparent: true,
  //   // opacity: 0.5,
  // })

  // const cubeMaterial1 = new MeshBasicMaterial({
  //   color: 'white',
  //   // wireframe: true,
  //   // transparent: true,
  //   // opacity: 0.5,
  // })

  // const sphereMaterial = new MeshBasicMaterial({
  //   color: 'red',
  //   // wireframe: true,
  //   // transparent: true,
  //   // opacity: 0.5,
  // })

  const bufferMaterial = new MeshBasicMaterial({
    color: 'white',
    wireframe: true,
    // transparent: true,
    // opacity: 0.5,
  })

  // Texture
  // const textureLoader = new TextureLoader()
  // const texture1 = textureLoader.load('../materials/rustediron1-alt2-bl/rustediron2_basecolor.png')
  // materialBasic.map = texture1

  // Create 3D objects
  const cubeGeometry = new BoxGeometry(1, 1, 1, 3, 3, 3)
  const cubeMesh = new Mesh(cubeGeometry, material)
  const cubeMesh1 = new Mesh(cubeGeometry, materialPhong)

  cubeMesh.position.y = 1
  cubeMesh.position.set(1, 1, 1)
  cubeMesh1.position.set(1, -1, 1)
  cubeMesh.scale.setScalar(0.5)

  const torusKnotGiometry = new TorusKnotGeometry(0.5, 0.15, 100, 16)
  const torusKnotMesh = new Mesh(torusKnotGiometry, materialPhong)

  torusKnotMesh.position.set(-1, 1, 1)

  const sphereGeometry = new SphereGeometry(0.5, 20, 20)
  const sphereMesh = new Mesh(sphereGeometry, materialStandart)
  const sphereMesh1 = new Mesh(sphereGeometry, grassMaterial)
  const sphereMesh2 = new Mesh(sphereGeometry, boulderMaterial)
  const sphereMesh3 = new Mesh(sphereGeometry, spaceCruiserMaterial)
  const sphereMesh4 = new Mesh(sphereGeometry, materialWithTexture4)

  sphereMesh.position.set(-1, -1, 1)
  sphereMesh1.position.set(-1, -1, 3)
  sphereMesh2.position.set(1, 1, 3)
  sphereMesh3.position.set(1, -1, 3)
  sphereMesh4.position.set(-1, 1, 3)

  const geometry = new BufferGeometry()
  const vertices = new Float32Array([
    -1.0,
    -1.0,
    1.0, // v0
    1.0,
    -1.0,
    1.0, // v1
    1.0,
    1.0,
    1.0, // v2

    1.0,
    1.0,
    1.0, // v3
    -1.0,
    1.0,
    1.0, // v4
    -1.0,
    -1.0,
    1.0, // v5

    -1.0,
    -1.0,
    1.0, // v6
    -1.0,
    1.0,
    1.0, // v7
    -1.0,
    1.0,
    3, // v8

    -1.0,
    -1.0,
    3, // v6
    -1.0,
    1.0,
    3, // v7
    -1.0,
    -1.0,
    1, // v8

    -1.0,
    -1.0,
    3, // v6
    1.0,
    -1.0,
    3, // v7
    -1.0,
    1.0,
    3, // v8

    -1.0,
    1.0,
    3, // v6
    1.0,
    1.0,
    3, // v7
    1.0,
    -1.0,
    3, // v8

    1.0,
    -1.0,
    1.0, // v6
    1.0,
    1.0,
    1.0, // v7
    1.0,
    1.0,
    3, // v8

    1.0,
    -1.0,
    3, // v6
    1.0,
    1.0,
    3, // v7
    1.0,
    -1.0,
    1, // v8
  ])

  const bufferMesh = new Mesh(geometry, bufferMaterial)
  const bufferAttribute = new BufferAttribute(vertices, 3)
  geometry.setAttribute('position', bufferAttribute)

  // Light
  const light = new AmbientLight('white', 0.1)
  scene.add(light)

  const pointLight = new PointLight('white', 20)
  pointLight.position.set(0, 0, 5)
  scene.add(pointLight)

  // const fog = new Fog('white', 2, 10)
  // scene.background = new Color('white')
  // scene.fog = fog

  // const groupSphere = new Group()
  // groupSphere.add(
  //   sphereMesh,
  //   sphereMesh1,
  //   sphereMesh2,
  //   sphereMesh3,
  //   sphereMesh4,
  // )
  scene.add(
    sphereMesh,
    sphereMesh1,
    sphereMesh2,
    sphereMesh3,
    sphereMesh4,
    cubeMesh,
    cubeMesh1,
    bufferMesh,
    torusKnotMesh,
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

template{
  background-color: black;
}
</style>
