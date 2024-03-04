import { ReactElement } from 'react'
import { GET_ALL_ACCOUNTS } from '../GraphQL/Queries'
import { useQuery } from '@apollo/client'



function Accounts(): ReactElement {
 
  const { data } = useQuery(GET_ALL_ACCOUNTS)
  
  if (data) {
    console.log(data)
  }


  return (
    <div className="flex h-screen bg-green-50 items-center" 
      // justify-center items-center"
    >
      <div className='flex-1 flex justify-between mx-8 h-48 border-2 border-lime-500 rounded-lg gap-x-4 p-4'>
        <div className="text-3xl text-lime-600">Log In</div>
        <div className='flex flex-col'>
          <div className="text-xl text-lime-600">Username</div>
          <input></input>
          <div className="text-xl text-lime-600">Password</div>
          <input></input>
          <button className='self-end mt-2 py-1 px-2 rounded-xl bg-lime-500 text-lime-200'>Submit</button>
        </div>
      </div>
    </div>

  )
}

export default Accounts
