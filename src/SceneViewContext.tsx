import { SceneViewContext } from './types'
import createContext from './utils/createContext'

const [
  useSceneViewContext,
  SceneViewContextProvider,
] = createContext<SceneViewContext>(
  'useSceneViewContext must be inside a SceneView.Container'
)

export { useSceneViewContext, SceneViewContextProvider }
