import React from 'react'
import { SceneView } from 'react-native-scene-view'
import { ExampleComponentType } from 'src/types'

import SceneA from './shared/SceneA'
import SceneB from './shared/SceneB'
import SceneC from './shared/SceneC'

const DotsExample: ExampleComponentType = () => {
  return (
    <SceneView paginationLength={3} pagination="dots-bottom">
      <SceneView.Scene>
        <SceneA />
      </SceneView.Scene>
      <SceneView.Scene>
        <SceneB />
      </SceneView.Scene>
      <SceneView.Scene>
        <SceneC />
      </SceneView.Scene>
    </SceneView>
  )
}

DotsExample.title = 'Dots Example'

export default DotsExample
