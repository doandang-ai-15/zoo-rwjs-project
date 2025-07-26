import AnimalCell from 'src/components/Animal/AnimalCell'

type AnimalPageProps = {
  id: number
}

const AnimalPage = ({ id }: AnimalPageProps) => {
  return <AnimalCell id={id} />
}

export default AnimalPage
