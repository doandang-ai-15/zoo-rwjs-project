import type {
  EditZooById,
  UpdateZooInput,
  UpdateZooMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ZooForm from 'src/components/Zoo/ZooForm'

export const QUERY: TypedDocumentNode<EditZooById> = gql`
  query EditZooById($id: Int!) {
    zoo: zoo(id: $id) {
      id
      name
    }
  }
`

const UPDATE_ZOO_MUTATION: TypedDocumentNode<
  EditZooById,
  UpdateZooMutationVariables
> = gql`
  mutation UpdateZooMutation($id: Int!, $input: UpdateZooInput!) {
    updateZoo(id: $id, input: $input) {
      id
      name
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ zoo }: CellSuccessProps<EditZooById>) => {
  const [updateZoo, { loading, error }] = useMutation(UPDATE_ZOO_MUTATION, {
    onCompleted: () => {
      toast.success('Zoo updated')
      navigate(routes.zoos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateZooInput, id: EditZooById['zoo']['id']) => {
    updateZoo({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">Edit Zoo {zoo?.id}</h2>
      </header>
      <div className="rw-segment-main">
        <ZooForm zoo={zoo} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
