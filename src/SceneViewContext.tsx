import { SceneViewContext } from './types'
import createContext from './utils/createContext'

const [
  useSceneViewContext,
  SceneViewContextProvider,
] = createContext<SceneViewContext>(
  'useSceneViewContext must be inside a SceneViewContainer'
)

export { useSceneViewContext, SceneViewContextProvider }
