import type { FindAnimals, FindAnimalsVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Animals from 'src/components/Animal/Animals'

export const QUERY: TypedDocumentNode<FindAnimals, FindAnimalsVariables> = gql`
  query FindAnimals {
    animals {
      id
      name
      zooId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No animals yet.{' '}
      <Link to={routes.newAnimal()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindAnimals>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  animals,
}: CellSuccessProps<FindAnimals, FindAnimalsVariables>) => {
  return <Animals animals={animals} />
}
