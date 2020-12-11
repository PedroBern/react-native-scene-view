import { Animated } from 'react-native'

export type Pagination = 'dots-bottom' | 'dots-top' | 'tabs-top' | 'tabs-bottom'

export type SceneViewContext = {
  nextScene: () => void
  previousScene: () => void
  width: number
  paginationLength: number
  animatedValue: Animated.Value
}
