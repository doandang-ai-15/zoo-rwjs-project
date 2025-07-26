import type {
  DeleteZooMutation,
  DeleteZooMutationVariables,
  FindZoos,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import type { TypedDocumentNode } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/Zoo/ZoosCell'
import { truncate } from 'src/lib/formatters'

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

const ZoosList = ({ zoos }: FindZoos) => {
  const [deleteZoo] = useMutation(DELETE_ZOO_MUTATION, {
    onCompleted: () => {
      toast.success('Zoo deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteZooMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete zoo ' + id + '?')) {
      deleteZoo({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {zoos.map((zoo) => (
            <tr key={zoo.id}>
              <td>{truncate(zoo.id)}</td>
              <td>{truncate(zoo.name)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.zoo({ id: zoo.id })}
                    title={'Show zoo ' + zoo.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editZoo({ id: zoo.id })}
                    title={'Edit zoo ' + zoo.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete zoo ' + zoo.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(zoo.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ZoosList
