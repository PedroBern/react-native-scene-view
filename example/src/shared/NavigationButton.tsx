import React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import { useSceneViewContext } from 'react-native-scene-view'

type Props = {
  back?: boolean
}

const NavigationButton: React.FC<Props> = ({ back = false }) => {
  const { nextScene, previousScene } = useSceneViewContext()

  return (
    <View style={styles.root}>
      <Button
        color="black"
        title={back ? 'Back' : 'Next'}
        onPress={back ? previousScene : nextScene}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 16,
  },
})

export default NavigationButton
