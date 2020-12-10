import React from 'react'

import ButtonsContainer from './ButtonsContainer'
import NavigationButton from './NavigationButton'
import SceneContainer from './SceneContainer'
import SceneTitle from './SceneTitle'

type Props = object

const SceneB: React.FC<Props> = (props) => {
  return (
    <SceneContainer backgroundColor="#e6ee9c">
      <SceneTitle name="B" />
      <ButtonsContainer>
        <NavigationButton back />
        <NavigationButton />
      </ButtonsContainer>
    </SceneContainer>
  )
}

export default SceneB
