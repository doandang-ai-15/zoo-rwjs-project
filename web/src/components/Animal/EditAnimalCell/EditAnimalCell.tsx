import type {
  EditAnimalById,
  UpdateAnimalInput,
  UpdateAnimalMutationVariables,
} from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type {
  CellSuccessProps,
  CellFailureProps,
  TypedDocumentNode,
} from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import AnimalForm from 'src/components/Animal/AnimalForm'

export const QUERY: TypedDocumentNode<EditAnimalById> = gql`
  query EditAnimalById($id: Int!) {
    animal: animal(id: $id) {
      id
      name
      zooId
    }
  }
`

const UPDATE_ANIMAL_MUTATION: TypedDocumentNode<
  EditAnimalById,
  UpdateAnimalMutationVariables
> = gql`
  mutation UpdateAnimalMutation($id: Int!, $input: UpdateAnimalInput!) {
    updateAnimal(id: $id, input: $input) {
      id
      name
      zooId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ animal }: CellSuccessProps<EditAnimalById>) => {
  const [updateAnimal, { loading, error }] = useMutation(
    UPDATE_ANIMAL_MUTATION,
    {
      onCompleted: () => {
        toast.success('Animal updated')
        navigate(routes.animals())
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  const onSave = (
    input: UpdateAnimalInput,
    id: EditAnimalById['animal']['id']
  ) => {
    updateAnimal({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Animal {animal?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <AnimalForm
          animal={animal}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
