import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type Props = ViewProps & {
  backgroundColor?: string
}

const SceneContainer: React.FC<Props> = ({
  children,
  style,
  backgroundColor = 'white',
  ...rest
}) => {
  return (
    <View style={[styles.container, { backgroundColor }, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default SceneContainer
