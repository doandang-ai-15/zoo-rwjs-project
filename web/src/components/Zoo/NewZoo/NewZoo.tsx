import type {
  CreateZooMutation,
  CreateZooInput,
  CreateZooMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ZooForm from 'src/components/Zoo/ZooForm'

const CREATE_ZOO_MUTATION: TypedDocumentNode<
  CreateZooMutation,
  CreateZooMutationVariables
> = gql`
  mutation CreateZooMutation($input: CreateZooInput!) {
    createZoo(input: $input) {
      id
    }
  }
`

const NewZoo = () => {
  const [createZoo, { loading, error }] = useMutation(CREATE_ZOO_MUTATION, {
    onCompleted: () => {
      toast.success('Zoo created')
      navigate(routes.zoos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateZooInput) => {
    createZoo({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Zoo</h2>
      </header>
      <div className="rw-segment-main">
        <ZooForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewZoo
