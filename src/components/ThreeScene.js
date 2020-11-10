import React, { useRef } from 'react'

import ResizeObserver from 'resize-observer-polyfill'

import Scene from 'libs/three/Scene'


export default class ThreeScene extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {}

    this.viewerRef = new React.createRef()

    this.scene = new Scene({
      react: {},
      units: props.units,
    })
  }

  componentDidMount() {
    this.resizeObs = new ResizeObserver(this.resize.bind(this))
      .observe(this.viewerRef.current)

    this.scene.init(this.viewerRef.current)
  }

  componentWillUnmount = () => {
    this.scene.dispose()
    // this.viewerRef.removeChild(this.renderer.domElement)
  }

  resize() {
    const ViewerDiv = this.viewerRef.current
    
    if (!ViewerDiv)
      return

    this.scene.resize(ViewerDiv.clientWidth, ViewerDiv.clientHeight)
  }

  render = () =>
    <div
      className="Viewer"
      ref={this.viewerRef}
    >
    </div>
}
