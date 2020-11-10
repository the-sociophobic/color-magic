import React from 'react'
import Div100vh from 'react-div-100vh'

import MainScene from 'components/MainScene'

import 'styles/index.sass'


class App extends React.Component {
  state = {}

  render = () =>
    <Div100vh>
      <div className="App">
        <MainScene />
      </div>
    </Div100vh>
}

export default App
