import React from 'react'

type CreateContex<A> = readonly [
  () => A,
  React.ProviderExoticComponent<React.ProviderProps<A | undefined>>
]

function createContext<A>(
  errorMessage: string = 'useContext must be inside a Provider with a value'
): CreateContex<A> {
  const ctx = React.createContext<A | undefined>(undefined)
  function useCtx(): A {
    const c = React.useContext(ctx)
    if (!c) throw new Error(errorMessage)
    return c
  }
  // make TypeScript infer a tuple, not an array of union types
  return [useCtx, ctx.Provider] as const
}

export default createContext
