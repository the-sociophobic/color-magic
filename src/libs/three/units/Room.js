import * as THREE from 'three'
import classes from 'multiple-extend'

import Model from 'libs/three/units/Model'
import transitionHandler from 'libs/three/units/transitionHandler'
import tapEvent from 'libs/utils/tapEvent'


const degToRad = deg =>
  deg / 180 * Math.PI

const setQuaternion = angle => {
  let res = new THREE.Quaternion()

  res.setFromAxisAngle( new THREE.Vector3( 0, 1, 0 ), degToRad(angle) )

  return res
}

const initialAngles = [48, 18, -18, -48]


export default class Room extends classes(Model, transitionHandler) {
  constructor(props) {
    super(props)
    this.loadModel(this)
  }

  rotateDoor = props => {
    if (this.doorsTransitionIds[props.index] !== -1) {
      this.unregisterTransition(this.doorsTransitionIds[props.index])
      this.doorsTransitionIds[props.index] = -1
    }

    this.doorsTransitionIds[props.index] = this.registerTransition({
      variable: this.doors[props.index].quaternion,
      value: setQuaternion(props.angle),
      numberOfFrames: props.frames,
      timingFuntion: 'easeOutQuad',
      onComplete: props.onComplete,
    })
  }

  setInitialRotationDoor = index => {
    this.doors[index]
      .quaternion
      .copy(setQuaternion(initialAngles[index]))

    this.rotateDoor({
      index: index,
      angle: initialAngles[index] + (index > 1 ? 22 : -22),
      frames: 200,
    })
  }

  onMouseOverDoor = index =>
    this.rotateDoor({
      index: index,
      angle: initialAngles[index] + (index > 1 ? 44 : -44),
      frames: 50
    })

  onMouseOutDoor = index =>
    this.rotateDoor({
      index: index,
      angle: initialAngles[index] + (index > 1 ? 22 : -22),
      frames: 30
    })

  clickDoor = (index, props) =>
    this.rotateDoor({
      index: index,
      angle: initialAngles[index] + (index > 1 ? 70 : -70),
      frames: 70,
      onComplete: props.react.openDoor(index)
    })


  onLoad = () => {
    this.scene.scale.multiplyScalar(5.5)
    this.scene.position.add(new THREE.Vector3(0, -15, 20))
    this.scene.rotation.y += Math.PI

    this.doors = []
    this.doorsTransitionIds = [-1, -1, -1, -1]

    this.scene.children
      .slice(3)
      .forEach(door =>
        this.doors.unshift(door))

    this.doors
      .forEach((door, index) => {
        this.setInitialRotationDoor(index)

        door.cursor = 'pointer'
        tapEvent(door, () => this.clickDoor(index, this.props))
        tapEvent(door, () => this.clickDoor(index, this.props), 'mousedown', 'mouseup')
        door.on('mouseover', () => this.onMouseOverDoor(index))
        door.on('mouseout', () => this.onMouseOutDoor(index))
      })
  }

  animate = props => {
    this.animateTransitions()

    // let alpha = props.frameNumber / props.maxFrameNumber * 7

    // this.scene && (this.scene.rotation.y = alpha * 2 * Math.PI)
  }
  dispose = props => {}
}