import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
// import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
// import { EffectComposer, RenderPass } from 'postprocessing'
import { Interaction } from 'three.interaction'

import transitionHandler from './handlers/transitionHandler'


const targetToCamera = -25
const maxFrameNumber = 5000


export default class Scene extends transitionHandler {

  constructor(props) {
    super(props)
    this.scene = {
      renderer: undefined,
      camera: undefined,
      scene: new THREE.Scene(),
      composer: undefined,
      controls: undefined,
      interaction: undefined,
    
      clock: new THREE.Clock(),
      frameNumber: 0,
    
      units: {},
      unitsToggled: false,

      react: props.react,
    }
  }

  init = ViewerDiv => {
    const W = ViewerDiv.clientWidth
    const H = ViewerDiv.clientHeight

    //ADD RENDERER
    const optimise = W > 1200
    this.scene.renderer = new THREE.WebGLRenderer({ antialias: !optimise, alpha: true })
    this.scene.renderer.setClearColor(0x000000, 0)
    this.scene.renderer.setSize(W, H)
    // this.scene.renderer.setPixelRatio(!optimise ? window.devicePixelRatio : 1)
    this.scene.renderer.setPixelRatio(window.devicePixelRatio)
    this.scene.renderer.shadowMap.enabled = true

    ViewerDiv.appendChild(this.scene.renderer.domElement)

    //ADD CAMERA
    this.scene.camera = new THREE.PerspectiveCamera(
      75,
      W / H,
      0.1,
      1000
    )
    this.scene.controls = new OrbitControls(this.scene.camera, this.scene.renderer.domElement)
    this.scene.controls.enabled = false
    this.scene.camera.position.z = targetToCamera
    this.scene.controls.update()

    this.scene.interaction = new Interaction(this.scene.renderer, this.scene.scene, this.scene.camera)

    // this.scene.composer = new EffectComposer(this.scene.renderer)
    // this.scene.composer.addPass(new RenderPass(this.scene.scene, this.scene.camera))

    this.initUnits()

    if (!this.frameId)
      this.frameId = requestAnimationFrame(this.animate)
  }

  dispose = () => {
    this.disposeUnits()
    cancelAnimationFrame(this.frameId)
  }

  resize = (W, H) => {
    if (!this.scene.renderer || !this.scene.camera)
      return

    // const optimise = W > 1200

    this.scene.camera.aspect = W / H
    this.scene.camera.updateProjectionMatrix()

    this.scene.renderer.setSize(W, H)
    // this.scene.renderer.setPixelRatio(!optimise ? window.devicePixelRatio : 1)
    this.scene.renderer.setPixelRatio(window.devicePixelRatio)
  }

  animate = () => {
    this.scene.frameNumber = (this.scene.frameNumber + 1) % maxFrameNumber

    const { left, right, top, bottom } = this.scene.renderer.domElement.getBoundingClientRect()
 
    const isOffscreen =
      bottom < 0 ||
      top > this.scene.renderer.domElement.clientHeight ||
      right < 0 ||
      left > this.scene.renderer.domElement.clientWidth;
  
    if (!isOffscreen || true) {
      const {
        composer,
        controls,
        units,
        clock,
        renderer
      } = this.scene
  
      Object.keys(units)
        .forEach(unitName =>
          units[unitName].animate({
            THREE: THREE,
            ...this.scene,
            input: this.scene.units.Controls,
            maxFrameNumber: maxFrameNumber,
            react: this.props.react,
          }))
  
      controls.update()
      // composer.render()
      // composer.render(clock.getDelta())
      renderer.render(this.scene.scene, this.scene.camera)
    }

    this.frameId = window.requestAnimationFrame(this.animate)
  }


  initUnits = () => {
    const props = {
      THREE: THREE,
      ...this.scene,
      input: this.scene.units.Controls,
      maxFrameNumber: maxFrameNumber,
      react: this.props.react,
    }

    Object.keys(this.props.units)
      .forEach(unitName => {
        const unit = this.props.units[unitName]

        if (!unit.disabled ^ this.scene.unitsToggled) {
          this.scene.units[unitName] = new unit.unit({...props, ...unit.args})
          this.scene.units[unitName].init &&
            this.scene.units[unitName].init()
        }
      })
  }

  disposeUnits = () => {
    const {
      scene,
      units,
    } = this.scene

    Object.keys(units)
      .forEach(unitName => units[unitName].dispose())

    //REDO THIS SHIT: units should unregister themselves
    while(scene.children.length > 0)
      scene.remove(scene.children[0])
  }

  toggleUnits = () => {
    this.disposeUnits()
    this.scene.unitsToggled = !this.scene.unitsToggled
    this.initUnits()
  }

  // toggleUnit = unitName => {
  //   // if (this.scene[unitName].enabled)
  //   console.log(this.scene.scene.children)
  // }
}
