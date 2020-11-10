import * as THREE from 'three'
import Unit from 'libs/three/Unit'

import modelLoader from 'libs/three/modelLoader'


export default class Model extends Unit {
  constructor(props) {
    super(props)

    this.loadModel()
  }

  loadModel = async () => {
    this.gtlf = await modelLoader(this.props.file)
    this.model = this.gtlf.scene

    // this.model.castShadow = true
    // this.model.receiveShadow = true

    this.props.scene.add(this.model)
  }

  animate = props => {
    let alpha = props.frameNumber / props.maxFrameNumber * 7

    this.model && (this.model.rotation.y = alpha * 2 * Math.PI)
  }
  dispose = props => {}
}