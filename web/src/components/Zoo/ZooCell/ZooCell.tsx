import type { FindZooById, FindZooByIdVariables } from 'types/graphql'

import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Zoo from 'src/components/Zoo/Zoo'

export const QUERY: TypedDocumentNode<FindZooById, FindZooByIdVariables> = gql`
  query FindZooById($id: Int!) {
    zoo: zoo(id: $id) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Zoo not found</div>

export const Failure = ({ error }: CellFailureProps<FindZooByIdVariables>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  zoo,
}: CellSuccessProps<FindZooById, FindZooByIdVariables>) => {
  return <Zoo zoo={zoo} />
}
