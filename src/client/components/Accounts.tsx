import { ReactElement } from 'react'
import { GET_ALL_ACCOUNTS } from '../GraphQL/Queries'
import { useQuery } from '@apollo/client'



function Accounts(): ReactElement {
 
  const { data } = useQuery(GET_ALL_ACCOUNTS)
  
  if (data) {
    console.log(data)
  }


  return (
    <div className='bg-red-300 h-20 w-20'>
      {data && data.getAllAccounts.map(( account: any ) => 
        <div key={account.__typename + account.id} className='flex bg-fuchsia-400 text-fuchsia-700'>{account.username + ' ' + account.password}</div>  
      )}
    </div>

  )
}

export default Accounts
