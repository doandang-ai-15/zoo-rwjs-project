import type { FindAnimalById, FindAnimalByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Animal from 'src/components/Animal/Animal'

export const QUERY: TypedDocumentNode<FindAnimalById, FindAnimalByIdVariables> =
  gql`
    query FindAnimalById($id: Int!) {
      animal: animal(id: $id) {
        id
        name
        zooId
      }
    }
  `

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Animal not found</div>

export const Failure = ({
  error,
}: CellFailureProps<FindAnimalByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  animal,
}: CellSuccessProps<FindAnimalById, FindAnimalByIdVariables>) => {
  return <Animal animal={animal} />
}
