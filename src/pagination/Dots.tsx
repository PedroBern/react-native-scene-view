import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { PaginationProps } from 'src/types'

import { useSceneViewContext } from '../SceneViewContext'

const Dots: React.FC<PaginationProps> = ({
  style,
  length,
  spacing = 8,
  ...rest
}) => {
  const {
    width,
    animatedValue: scrollX,
    activeColor,
    inactiveColor,
  } = useSceneViewContext()

  const [activeDotLeft, setActiveDotLeft] = React.useState(-1)

  const [activeDotTranslateX, setActiveDotTranslateX] = React.useState(
    Animated.diffClamp(scrollX, 0, width * length).interpolate({
      inputRange: [0, width],
      outputRange: [0, spacing * 2],
    })
  )

  React.useEffect(() => {
    setActiveDotTranslateX(
      Animated.diffClamp(scrollX, 0, width * length).interpolate({
        inputRange: [0, width],
        outputRange: [0, spacing * 2],
      })
    )
  }, [width, spacing, length, scrollX])

  const getDotStyle = React.useCallback(
    () => ({
      backgroundColor: inactiveColor,
      width: spacing,
      height: spacing,
      borderRadius: spacing / 2,
      margin: spacing / 2,
    }),
    [inactiveColor, spacing]
  )

  const renderDots = React.useCallback(
    () =>
      [...Array(length - 1)].map((_e, i) => (
        <Animated.View key={i} style={getDotStyle()} />
      )),
    [getDotStyle, length]
  )

  return (
    <View style={[styles.root, style]} {...rest}>
      {activeDotLeft > -1 && (
        <Animated.View
          style={[
            getDotStyle(),
            styles.activeDot,
            {
              backgroundColor: activeColor,
              left: activeDotLeft,
              transform: [
                {
                  translateX: activeDotTranslateX,
                },
              ],
            },
          ]}
        />
      )}

      <View style={styles.dots}>
        {/* first dot */}
        <Animated.View
          onLayout={(event) => {
            setActiveDotLeft(event.nativeEvent.layout.x - spacing / 2)
          }}
          style={[
            getDotStyle(),
            {
              backgroundColor:
                activeDotLeft === -1 ? activeColor : inactiveColor,
            },
          ]}
        />
        {/* other dots */}
        {renderDots()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    zIndex: 1000,
    position: 'absolute',
    bottom: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeDot: {
    position: 'absolute',
    zIndex: 100,
  },
  dots: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Dots
