import React from 'react'

import ButtonsContainer from './ButtonsContainer'
import NavigationButton from './NavigationButton'
import SceneContainer from './SceneContainer'
import SceneTitle from './SceneTitle'

type Props = object

const SceneA: React.FC<Props> = (props) => {
  return (
    <SceneContainer backgroundColor="#81d4fa">
      <SceneTitle name="A" />
      <ButtonsContainer>
        <NavigationButton />
      </ButtonsContainer>
    </SceneContainer>
  )
}

export default SceneA
