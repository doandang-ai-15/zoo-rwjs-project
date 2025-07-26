import type { FindZoos, FindZoosVariables } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'

import Zoos from 'src/components/Zoo/Zoos'

export const QUERY: TypedDocumentNode<FindZoos, FindZoosVariables> = gql`
  query FindZoos {
    zoos {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      No zoos yet.{' '}
      <Link to={routes.newZoo()} className="rw-link">
        Create one?
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps<FindZoos>) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  zoos,
}: CellSuccessProps<FindZoos, FindZoosVariables>) => {
  return <Zoos zoos={zoos} />
}
