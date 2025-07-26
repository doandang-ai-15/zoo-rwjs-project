import EditZooCell from 'src/components/Zoo/EditZooCell'

type ZooPageProps = {
  id: number
}

const EditZooPage = ({ id }: ZooPageProps) => {
  return <EditZooCell id={id} />
}

export default EditZooPage
