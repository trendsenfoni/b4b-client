import LayoutClientSide from './layout-client'


interface Props {
  params: {
    store: string
  },
  children: React.ReactNode
}
const RootLayout = ({ children, params }: Props) => {
  return (<>
    <LayoutClientSide store={params.store} />
    {children}
  </>)
}

export default RootLayout