import React from 'react'
import {
  Animated,
  ScrollView,
  ScrollViewProps,
  Dimensions,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native'

import Scene from './Scene'
import { SceneViewContextProvider } from './SceneViewContext'
import DotsComponent from './pagination/Dots'
import TabsComponent from './pagination/Tabs'
import { Pagination } from './types'

type Props = {
  width?: number
  paginationLength?: number
  pagination?: Pagination
  containerProps?: ViewProps
} & ScrollViewProps

const SceneView: React.FC<Props> & {
  Scene: typeof Scene
  Dots: typeof DotsComponent
  Tabs: typeof TabsComponent
} = ({
  children,
  width = Dimensions.get('window').width,
  paginationLength = 0,
  pagination,
  containerProps,
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
      value={{
        nextScene,
        previousScene,
        width,
        animatedValue: scrollX,
        paginationLength,
      }}
    >
      <View
        {...containerProps}
        style={[
          styles.container,
          containerProps?.style && containerProps.style,
        ]}
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
        {paginationLength > 0 && pagination === 'dots-bottom' && (
          <DotsComponent length={paginationLength} />
        )}
        {paginationLength > 0 && pagination === 'dots-top' && (
          <DotsComponent length={paginationLength} style={styles.dotsTop} />
        )}
        {paginationLength > 0 && pagination === 'tabs-top' && (
          <TabsComponent length={paginationLength} />
        )}
        {paginationLength > 0 && pagination === 'tabs-bottom' && (
          <TabsComponent length={paginationLength} style={styles.tabsBottom} />
        )}
      </View>
    </SceneViewContextProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dotsTop: {
    top: 24,
    bottom: undefined,
  },
  tabsBottom: {
    top: undefined,
    bottom: 0,
  },
})

SceneView.Scene = Scene
SceneView.Dots = DotsComponent
SceneView.Tabs = TabsComponent

export default SceneView
