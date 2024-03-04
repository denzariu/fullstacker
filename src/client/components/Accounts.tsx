import { ReactElement } from 'react'
import { GET_ALL_ACCOUNTS } from '../GraphQL/Queries'
import { useQuery } from '@apollo/client'



function Accounts(): ReactElement {
 
  const { data } = useQuery(GET_ALL_ACCOUNTS)
  
  if (data) {
    console.log(data)
  }


  return (
    <div className="bg-fuchsia-50">
      <div className="text-xl">All Accounts</div>
      {data && data.getAllAccounts.map(( account: any ) => 
        <div key={account.__typename + account.id}
          className='flex gap-1'
        >
          <div className="bg-fuchsia-100 text-fuchsia-700">{account.username}</div>
          <div >{account.password}</div>
        </div>  
      )}
    </div>

  )
}

export default Accounts
