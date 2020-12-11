import React from 'react'
import { SceneView } from 'react-native-scene-view'
import { ExampleComponentType } from 'src/types'

import SceneA from './shared/SceneA'
import SceneB from './shared/SceneB'
import SceneC from './shared/SceneC'

const WithoutPaginationExample: ExampleComponentType = () => {
  return (
    <SceneView>
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

WithoutPaginationExample.title = 'Without Pagination Example'

export default WithoutPaginationExample
