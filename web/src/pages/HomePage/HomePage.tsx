// web/src/pages/HomePage/HomePage.tsx
import { useEffect, useState } from 'react'

import { gql } from 'graphql-request'

import { client } from 'src/lib/graphql'

const ZOOS_QUERY = gql`
  query {
    zoos {
      id
      name
    }
  }
`

const HomePage = () => {
  const [zoos, setZoos] = useState([])

  useEffect(() => {
    client.request(ZOOS_QUERY).then((data) => {
      setZoos(data.zoos)
    })
  }, [])

  return (
    <ul>
      {zoos.map((zoo) => (
        <li key={zoo.id}>{zoo.name}</li>
      ))}
    </ul>
  )
}
export default HomePage
