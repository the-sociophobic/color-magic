import * as THREE from 'three'
import Model from 'libs/three/units/Model'


export default class Head extends Model {
  constructor(props) {
    super(props)
  }

  animate = props => {
    if (this.model) {
      if (!this.loaded) {
        this.loaded = true
        this.model.scale.set(12, 10, 12)
      }

      this.model.rotation.y = Math.PI / 2 - props.input.mouse.alphaX
      this.model.rotation.z = -props.input.mouse.alphaY
    }
  }
  dispose = props => {}
}