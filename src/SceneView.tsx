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
import { Pagination, PaginationProps } from './types'

type Props = {
  width?: number
  paginationLength?: number
  pagination?: Pagination
  containerProps?: ViewProps
  activeColor?: string
  inactiveColor?: string
  paginationProps?: Omit<PaginationProps, 'length'>
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
  activeColor = 'rgba(0, 0, 0, 1)',
  inactiveColor = 'rgba(0, 0, 0, 0.3)',
  paginationProps,
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

  const renderPagination = React.useCallback(() => {
    if (paginationLength === 0) return null
    switch (pagination) {
      case 'dots-bottom':
        return <DotsComponent length={paginationLength} {...paginationProps} />
      case 'dots-top':
        return (
          <DotsComponent
            length={paginationLength}
            {...paginationProps}
            style={[styles.dotsTop, paginationProps?.style]}
          />
        )
      case 'tabs-top':
        return <TabsComponent length={paginationLength} {...paginationProps} />
      case 'tabs-bottom':
        return (
          <TabsComponent
            length={paginationLength}
            {...paginationProps}
            style={[styles.tabsBottom, paginationProps?.style]}
          />
        )
      default:
        return null
    }
  }, [paginationLength, pagination, paginationProps])

  return (
    <SceneViewContextProvider
      value={{
        nextScene,
        previousScene,
        width,
        animatedValue: scrollX,
        paginationLength,
        activeColor,
        inactiveColor,
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
        {renderPagination()}
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
