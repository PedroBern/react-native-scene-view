import { Animated } from 'react-native'

export type SceneViewContext = {
  nextScene: () => void
  previousScene: () => void
  width: number
  dots: number
  animatedValue: Animated.Value
}
