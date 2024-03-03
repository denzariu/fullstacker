import { ReactElement } from 'react'
import { useQuery } from 'urql';

const query = `
{
  posts {
    id
    author
    book
    body
  }
}
`

function Posts(): ReactElement {
  const [result] = useQuery({ query },)

  console.log(result)
  const { data, fetching, error } = result;

  if (fetching) return <div>Loading...</div>
  if (error) return <div>Error {error.message}</div>

  const posts = data.posts
  
  return (
    <div>
      {posts}
    </div>

  )
}

export default Posts
