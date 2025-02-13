<template>
  <div>
    <h1>Solar System</h1>
    <div id="threejs-container" ref="container"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import {
  Scene,
  // Mesh,
  // BoxGeometry,
  // MeshBasicMaterial,
  PerspectiveCamera,
  WebGLRenderer,
  OrthographicCamera,
  AxesHelper,
  // MeshLambertMaterial,
  Mesh,
  MeshStandardMaterial,
  SphereGeometry,
  AmbientLight,
  PointLight,
  MeshBasicMaterial,
  // Clock,
  TextureLoader,
  CubeTextureLoader,
  SRGBColorSpace,
  // Group,
  // Clock,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const container = ref()

onMounted(() => {
  const scene = new Scene()

  // const material = new MeshLambertMaterial()

  const textureLoader = new TextureLoader()
  const cubeTextureLoader = new CubeTextureLoader()
  cubeTextureLoader.setPath('/textures/solarSystemmaterials/cubeMap/')

  // adding textures
  const sunTexture = textureLoader.load('/textures/solarSystemmaterials/2k_sun.jpg')
  sunTexture.colorSpace = SRGBColorSpace
  const mercuryTexture = textureLoader.load('/textures/solarSystemmaterials/2k_mercury.jpg')
  mercuryTexture.colorSpace = SRGBColorSpace
  const venusTexture = textureLoader.load('/textures/solarSystemmaterials/2k_venus_surface.jpg')
  venusTexture.colorSpace = SRGBColorSpace
  const earthTexture = textureLoader.load('/textures/solarSystemmaterials/2k_earth_daymap.jpg')
  earthTexture.colorSpace = SRGBColorSpace
  const marsTexture = textureLoader.load('/textures/solarSystemmaterials/2k_mars.jpg')
  marsTexture.colorSpace = SRGBColorSpace
  const moonTexture = textureLoader.load('/textures/solarSystemmaterials/2k_moon.jpg')
  moonTexture.colorSpace = SRGBColorSpace

  const backgroundCubemap = cubeTextureLoader.load([
    'px.png',
    'nx.png',
    'py.png',
    'ny.png',
    'pz.png',
    'nz.png',
  ])

  scene.background = backgroundCubemap

  // add materials

  const sunMaterial = new MeshBasicMaterial({
    map: sunTexture,
  })
  const mercuryMaterial = new MeshStandardMaterial({
    map: mercuryTexture,
  })
  const venusMaterial = new MeshStandardMaterial({
    map: venusTexture,
  })
  const earthMaterial = new MeshStandardMaterial({
    map: earthTexture,
  })
  const marsMaterial = new MeshStandardMaterial({
    map: marsTexture,
  })
  const moonMaterial = new MeshStandardMaterial({
    map: moonTexture,
  })

  const planets = [
    {
      name: 'Mercury',
      radius: 0.5,
      distance: 10,
      speed: 0.01,
      material: mercuryMaterial,
      moons: [],
    },
    {
      name: 'Venus',
      radius: 0.8,
      distance: 15,
      speed: 0.007,
      material: venusMaterial,
      moons: [],
    },
    {
      name: 'Earth',
      radius: 1,
      distance: 20,
      speed: 0.005,
      material: earthMaterial,
      moons: [
        {
          name: 'Moon',
          radius: 0.3,
          distance: 3,
          speed: 0.015,
        },
      ],
    },
    {
      name: 'Mars',
      radius: 0.7,
      distance: 25,
      speed: 0.003,
      material: marsMaterial,
      moons: [
        {
          name: 'Phobos',
          radius: 0.1,
          distance: 2,
          speed: 0.02,
        },
        {
          name: 'Deimos',
          radius: 0.2,
          distance: 3,
          speed: 0.015,
          color: 0xffffff,
        },
      ],
    },
  ]

  const sphereGeometry = new SphereGeometry(1, 20, 20)

  const sun = new Mesh(sphereGeometry, sunMaterial)
  // const earth = new Mesh(sphereGeometry, earthMaterial)
  // const moon = new Mesh(sphereGeometry, moonMaterial)

  sun.position.set(0, 0, 0)
  sun.scale.setScalar(5)

  const createPlanet = (planet) => {
    const planetMesh = new Mesh(sphereGeometry, planet.material)
    planetMesh.scale.setScalar(planet.radius)
    planetMesh.position.x = planet.distance
    return planetMesh
  }

  const createMoon = (moon) => {
    const moonMesh = new Mesh(sphereGeometry, moonMaterial)
    moonMesh.scale.setScalar(moon.radius)
    moonMesh.position.x = moon.distance
    return moonMesh
  }

  const planetMeshes = planets.map((planet) => {
    const planetMesh = createPlanet(planet)
    scene.add(planetMesh)

    planet.moons.forEach((moon) => {
      const moonMesh = createMoon(moon)
      planetMesh.add(moonMesh)
    })
    return planetMesh
  })

  scene.add(sun)

  const axesHelper = new AxesHelper(10)
  scene.add(axesHelper)

  const aspectRatio = window.innerWidth / window.innerHeight

  const camera = new PerspectiveCamera(35, aspectRatio, 0.1, 1000)
  camera.position.z = 30

  const ortCamera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000)
  ortCamera.position.z = 5

  const light = new AmbientLight('white', 0.1)
  scene.add(light)

  const pointLight = new PointLight('white', 1000)
  pointLight.position.set(0, 0, 0)
  scene.add(pointLight)

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
  controls.rotateSpeed = 0.5

  // controls.update()

  function animate() {
    planetMeshes.forEach((planet, planetIndex)=>{
    planet.rotation.y +=  planets[planetIndex].speed
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
    planet.children.forEach((moon, moonIndex) =>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
    })
  })

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
template{
  background-color: black;
}
</style>
