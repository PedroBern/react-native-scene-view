import React from 'react'
import { Animated, StyleSheet, View, ViewProps } from 'react-native'

import { useSceneViewContext } from '../SceneViewContext'

type Props = ViewProps & {
  spacing?: number
  activeColor?: string
  inactiveColor?: string
}

const Dots: React.FC<Props> = ({
  style,
  spacing = 8,
  activeColor = 'rgba(0, 0, 0, 1)',
  inactiveColor = 'rgba(0, 0, 0, 0.3)',
  ...rest
}) => {
  const { width, animatedValue: scrollX, dots: length } = useSceneViewContext()

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
    <View style={styles.root} {...rest}>
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
