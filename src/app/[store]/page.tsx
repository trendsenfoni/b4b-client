interface Props {
  params: {
    store: string
  }
}
export default function MainPage({ params }: Props) {
  const { store } = params
  return (<>
    <h1>{store}</h1>
  </>)
}