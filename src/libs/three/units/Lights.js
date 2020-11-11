import Unit from 'libs/three/Unit'


const data = [
  { color: 0x0000ff, x:  23, z: 13.8 },
  { color: 0x00ff00, x:  11, z: 25 },
  { color: 0xaa0055, x: -11, z: 25 },
  { color: 0xaaaa00, x: -23, z: 13.8 },
]


export default class Lowpoly extends Unit {
  constructor(props) {
    super(props)

    const { scene, THREE } = props

    this.light0 = new THREE.HemisphereLight( 0xffffff, 0x444444, 1.35 )
    this.light0.position.set(0, 3, 0)
    scene.add( this.light0 )

    this.lights = []

    data.forEach((lightData, index) => {
      this.lights.push(new THREE.SpotLight( lightData.color, 0xffffff, 35 ))

      const light = this.lights[index]

      light.position.set( lightData.x, -12.5, lightData.z )
      light.castShadow = true
      light.decay = 12
      scene.add( light )
  
      light.shadow.mapSize.width = 512 // default
      light.shadow.mapSize.height = 512 // default
      light.shadow.camera.near = 0.5 // default
      light.shadow.camera.far = 500 // default
    })
  }

  animate = props => {}
  dispose = () => {}
}
