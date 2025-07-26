import type {
  DeleteZooMutation,
  DeleteZooMutationVariables,
  FindZooById,
} from 'types/graphql'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {} from 'src/lib/formatters'

const DELETE_ZOO_MUTATION: TypedDocumentNode<
  DeleteZooMutation,
  DeleteZooMutationVariables
> = gql`
  mutation DeleteZooMutation($id: Int!) {
    deleteZoo(id: $id) {
      id
    }
  }
`

interface Props {
  zoo: NonNullable<FindZooById['zoo']>
}

const Zoo = ({ zoo }: Props) => {
  const [deleteZoo] = useMutation(DELETE_ZOO_MUTATION, {
    onCompleted: () => {
      toast.success('Zoo deleted')
      navigate(routes.zoos())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteZooMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete zoo ' + id + '?')) {
      deleteZoo({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Zoo {zoo.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{zoo.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{zoo.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editZoo({ id: zoo.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(zoo.id)}
        >
          Delete
        </button>
      </nav>
    </>
  )
}

export default Zoo
