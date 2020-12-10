export type ExampleComponentType = React.FC<object> & {
  title: string
  tintColor?: string
  backgroundColor?: string
  statusBarStyle?: 'light-content' | 'dark-content'
  appbarElevation?: number
}
