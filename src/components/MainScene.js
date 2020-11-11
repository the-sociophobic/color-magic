import React from 'react'

import ThreeScene from 'components/ThreeScene'
import Room from 'libs/three/units/Room'
import Lights from 'libs/three/units/Lights'

import scene from 'models/scene.glb'


export default class MainScene extends React.Component {  
  render = () =>
    <ThreeScene
      id="sceneClosed"
      units={{
        head: {
          unit: Room,
          args: { file: scene },
          disabled: false,
        },
        lights: {
          unit: Lights,
          disabled: false,
        }
      }}
    />
}