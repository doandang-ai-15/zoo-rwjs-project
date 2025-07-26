import EditAnimalCell from 'src/components/Animal/EditAnimalCell'

type AnimalPageProps = {
  id: number
}

const EditAnimalPage = ({ id }: AnimalPageProps) => {
  return <EditAnimalCell id={id} />
}

export default EditAnimalPage
