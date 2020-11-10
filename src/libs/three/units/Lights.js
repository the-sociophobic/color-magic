import Unit from 'libs/three/Unit'


export default class Lowpoly extends Unit {
  constructor(props) {
    super(props)

    const { scene, THREE } = props

    this.light0 = new THREE.HemisphereLight( 0xffffff, 0x444444, 1.35 )
    this.light0.position.set( 0, 25, 0 )
    // this.light0.castShadow = true
    scene.add( this.light0 )
  }

  animate = props => {}
  dispose = () => {}
}
