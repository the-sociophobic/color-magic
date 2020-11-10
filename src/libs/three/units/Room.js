import * as THREE from 'three'
import Model from 'libs/three/units/Model'


export default class Room extends Model {
  constructor(props) {
    super(props)
  }

  animate = props => {
    if (this.model)
      if (!this.loaded) {
        this.loaded = true
        this.model.scale.set(5.5, 5.5, 5.5)
        this.model.position.set(0, -15, 20)
        this.model.rotation.y = Math.PI
      }

    // let alpha = props.frameNumber / props.maxFrameNumber * 7

    // this.model && (this.model.rotation.y = alpha * 2 * Math.PI)
  }
  dispose = props => {}
}