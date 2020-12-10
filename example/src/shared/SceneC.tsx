import React from 'react'

import ButtonsContainer from './ButtonsContainer'
import NavigationButton from './NavigationButton'
import SceneContainer from './SceneContainer'
import SceneTitle from './SceneTitle'

type Props = object

const SceneC: React.FC<Props> = (props) => {
  return (
    <SceneContainer backgroundColor="#ffab91">
      <SceneTitle name="C" />
      <ButtonsContainer>
        <NavigationButton back />
      </ButtonsContainer>
    </SceneContainer>
  )
}

export default SceneC
