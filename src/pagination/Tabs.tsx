import React from 'react'
import { Animated, StyleSheet, View, ViewProps } from 'react-native'

import { useSceneViewContext } from '../SceneViewContext'

type Props = ViewProps & {
  length: number
  spacing?: number
}

const Dots: React.FC<Props> = ({ style, length, spacing = 4, ...rest }) => {
  const {
    width,
    animatedValue: scrollX,
    activeColor,
    inactiveColor,
  } = useSceneViewContext()

  const [activeTabLeft, setActiveTabLeft] = React.useState(-1)

  const [activeTabTranslateX, setActiveTabTranslateX] = React.useState(
    Animated.diffClamp(scrollX, 0, width * length).interpolate({
      inputRange: [0, width],
      outputRange: [0, (width - spacing * 4) / length],
    })
  )

  React.useEffect(() => {
    setActiveTabTranslateX(
      Animated.diffClamp(scrollX, 0, width * length).interpolate({
        inputRange: [0, width],
        outputRange: [0, (width - spacing * 4) / length],
      })
    )
  }, [width, length, scrollX, spacing])

  const getTabStyle = React.useCallback(
    () => ({
      backgroundColor: inactiveColor,
      width: (width - spacing * 4) / length - spacing,
      height: spacing,
      borderRadius: spacing / 2,
      margin: spacing / 2,
    }),
    [inactiveColor, width, length, spacing]
  )

  const renderTabs = React.useCallback(
    () =>
      [...Array(length - 1)].map((_e, i) => (
        <Animated.View key={i} style={getTabStyle()} />
      )),
    [getTabStyle, length]
  )

  return (
    <View style={[styles.root, { width }, style]} {...rest}>
      {activeTabLeft > -1 && (
        <Animated.View
          style={[
            getTabStyle(),
            styles.activeTab,
            {
              backgroundColor: activeColor,
              left: activeTabLeft,
              transform: [
                {
                  translateX: activeTabTranslateX,
                },
              ],
            },
          ]}
        />
      )}

      <View style={styles.tabs}>
        {/* first tab */}
        <Animated.View
          onLayout={(event) => {
            setActiveTabLeft(event.nativeEvent.layout.x - spacing / 2)
          }}
          style={[
            getTabStyle(),
            {
              backgroundColor:
                activeTabLeft === -1 ? activeColor : inactiveColor,
            },
          ]}
        />
        {/* other tabs */}
        {renderTabs()}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    paddingVertical: 4,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  activeTab: {
    position: 'absolute',
    zIndex: 100,
  },
  tabs: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Dots
