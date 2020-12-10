import React from 'react'
import { Text, StyleSheet } from 'react-native'

type Props = {
  name: string
}

const SceneTitle: React.FC<Props> = ({ name }) => {
  return <Text style={styles.root}>Scene {name}</Text>
}

const styles = StyleSheet.create({
  root: {
    fontSize: 32,
  },
})

export default SceneTitle
