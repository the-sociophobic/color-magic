import Unit from 'libs/three/Unit'
import clamp from 'clamp'
import isTouchDevice from 'libs/utils/isTouchDevice'
import isMobile from 'libs/utils/isMobile'


const initialThis = {
  mouse: {
    alphaX: 0,
    alphaY: 0,
  },
}


export default class Controls extends Unit {
  constructor(props) {
    super(props)

    Object.keys(initialThis)
      .forEach(key => this[key] = initialThis[key])

    if (isTouchDevice()) {  
      ;
    }
    else {
      window.addEventListener('mousemove', this.handleMouseMove, false)
    }
  }


  init = () => {}

  animate = props => {}

  
  handleMouseMove = e => {
    if (!e.pageX || !e.pageY) {
      console.log("no mouse found")
      return
    }

    const { left, right, top, bottom } = this.props.renderer.domElement.getBoundingClientRect()
    const domElementCenterX = (right - left) / 2
    // const domElementCenterY = bottom + (top - bottom) / 2 - window.scrollY
    const domElementCenterY = (bottom - top) / 2

    this.mouse.alphaX = -clamp((e.pageX - domElementCenterX) / window.innerWidth, -1, 1)
    this.mouse.alphaY = clamp((e.pageY - domElementCenterY) / window.innerHeight, -1, 1)
  }


  dispose = () => {
    if (isTouchDevice())
      ;
    else
      window.removeEventListener('mousemove', this.handleMouseMove, false)
  }
}
