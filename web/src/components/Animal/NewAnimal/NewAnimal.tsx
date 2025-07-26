import type {
  CreateAnimalMutation,
  CreateAnimalInput,
  CreateAnimalMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AnimalForm from 'src/components/Animal/AnimalForm'

const CREATE_ANIMAL_MUTATION: TypedDocumentNode<
  CreateAnimalMutation,
  CreateAnimalMutationVariables
> = gql`
  mutation CreateAnimalMutation($input: CreateAnimalInput!) {
    createAnimal(input: $input) {
      id
    }
  }
`

const NewAnimal = () => {
  const [createAnimal, { loading, error }] = useMutation(
    CREATE_ANIMAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Animal created')
        navigate(routes.animals())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (input: CreateAnimalInput) => {
    createAnimal({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Animal</h2>
      </header>
      <div className="rw-segment-main">
        <AnimalForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAnimal
