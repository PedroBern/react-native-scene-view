import React from 'react'
import { SceneViewContainer } from 'react-native-scene-view'
import { ExampleComponentType } from 'src/types'

import SceneA from './shared/SceneA'
import SceneB from './shared/SceneB'
import SceneC from './shared/SceneC'

const SwippableExample: ExampleComponentType = () => {
  return (
    <SceneViewContainer dots={3} scrollEnabled>
      <SceneViewContainer.Scene>
        <SceneA />
      </SceneViewContainer.Scene>
      <SceneViewContainer.Scene>
        <SceneB />
      </SceneViewContainer.Scene>
      <SceneViewContainer.Scene>
        <SceneC />
      </SceneViewContainer.Scene>
    </SceneViewContainer>
  )
}

SwippableExample.title = 'Swippable Example'

export default SwippableExample
