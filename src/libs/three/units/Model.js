import * as THREE from 'three'
import Unit from 'libs/three/Unit'

import modelLoader from 'libs/three/modelLoader'


export default class Model extends Unit {
  constructor(props) {
    super(props)

    // this.loadModel()
  }

  loadModel = async _this => {
    _this.gtlf = await modelLoader(_this.props.file)
    _this.scene = _this.gtlf.scene
    // console.log(_this)
    // _this.scene.castShadow = true
    // _this.scene.receiveShadow = true

    _this.props.scene.add(_this.scene)

    _this.onLoad && _this.onLoad()
  }

  animate = props => {
    // let alpha = props.frameNumber / props.maxFrameNumber * 7

    // this.scene && (this.scene.rotation.y = alpha * 2 * Math.PI)
  }
  dispose = props => {}
}