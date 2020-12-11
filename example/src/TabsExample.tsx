import React from 'react'
import { SceneView } from 'react-native-scene-view'
import { ExampleComponentType } from 'src/types'

import SceneA from './shared/SceneA'
import SceneB from './shared/SceneB'
import SceneC from './shared/SceneC'

const TabsExample: ExampleComponentType = () => {
  return (
    <SceneView paginationLength={3} pagination="tabs-top">
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

TabsExample.title = 'Tabs Example'

export default TabsExample
