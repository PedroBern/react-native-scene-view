import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'

type Props = ViewProps

const ButtonsContainer: React.FC<Props> = ({ children, style, ...rest }) => {
  return (
    <View style={[styles.container]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ButtonsContainer
