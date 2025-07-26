import ZooCell from 'src/components/Zoo/ZooCell'

type ZooPageProps = {
  id: number
}

const ZooPage = ({ id }: ZooPageProps) => {
  return <ZooCell id={id} />
}

export default ZooPage
