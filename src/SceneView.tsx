import React from 'react'
import { View, ViewProps } from 'react-native'

import { useSceneViewContext } from './SceneViewContext'

type Props = ViewProps

const StepViewScene: React.FC<Props> = ({ style, children, ...rest }) => {
  const { width } = useSceneViewContext()

  return (
    <View style={[{ width }, style]} {...rest}>
      {children}
    </View>
  )
}

export default StepViewScene
