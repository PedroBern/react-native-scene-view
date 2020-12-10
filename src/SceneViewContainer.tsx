import React from 'react'
import { Animated, ScrollView, ScrollViewProps, Dimensions } from 'react-native'

import SceneView from './SceneView'
import { SceneViewContextProvider } from './SceneViewContext'
import DotsComponent from './pagination/Dots'

type Props = {
  width?: number
  dots?: number
} & ScrollViewProps

const SceneViewContainer: React.FC<Props> & {
  Scene: typeof SceneView
  Dots: typeof DotsComponent
} = ({
  children,
  width = Dimensions.get('window').width,
  dots = 0,
  ...rest
}) => {
  const scrollRef = React.useRef<ScrollView>()
  const scrollX = React.useRef(new Animated.Value(0)).current
  const scrollOffset = React.useRef(0)

  React.useLayoutEffect(() => {
    scrollX.addListener(({ value }) => {
      scrollOffset.current = value
    })
    return () => {
      scrollX.removeAllListeners()
    }
  }, [scrollX])

  const nextScene = React.useCallback(() => {
    scrollRef.current?.scrollTo({
      x: width + scrollOffset.current,
    })
  }, [width])

  const previousScene = React.useCallback(() => {
    scrollRef.current?.scrollTo({
      x: scrollOffset.current - width,
    })
  }, [width])

  return (
    <SceneViewContextProvider
      value={{ nextScene, previousScene, width, animatedValue: scrollX, dots }}
    >
      <Animated.ScrollView
        ref={scrollRef as React.RefObject<ScrollView>}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: true,
          }
        )}
        {...rest}
      >
        {children}
      </Animated.ScrollView>
      {dots > 0 && <DotsComponent />}
    </SceneViewContextProvider>
  )
}

SceneViewContainer.Scene = SceneView
SceneViewContainer.Dots = DotsComponent

export default SceneViewContainer
