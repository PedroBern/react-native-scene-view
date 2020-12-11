import React from 'react'
import { SceneView } from 'react-native-scene-view'
import { ExampleComponentType } from 'src/types'

import SceneA from './shared/SceneA'
import SceneB from './shared/SceneB'
import SceneC from './shared/SceneC'

const SwippableDotsExample: ExampleComponentType = () => {
  return (
    <SceneView paginationLength={3} pagination="dots-bottom" scrollEnabled>
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

SwippableDotsExample.title = 'Swippable Dots Example'

export default SwippableDotsExample
