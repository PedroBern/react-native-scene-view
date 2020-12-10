import MyComponent from 'MY_PACKAGE_NAME_HERE'
import React from 'react'
import { ExampleComponentType } from 'src/types'

const DefaultExample: ExampleComponentType = () => {
  return <MyComponent />
}

DefaultExample.title = 'Default Example'

export default DefaultExample
