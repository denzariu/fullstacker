import { ReactElement } from 'react'
import { GET_ALL_ACCOUNTS } from '../GraphQL/Queries'
import { useQuery } from '@apollo/client'
import { Field, Form, Formik } from 'formik'



function Accounts(): ReactElement {
 
  const { data } = useQuery(GET_ALL_ACCOUNTS)
  
  if (data) {
    console.log(data)
  }


  return (
    <div className="flex h-screen bg-green-50 items-center" 
      // justify-center items-center"
    >
      <div className='flex-1 sm:flex mx-8 lg:mx-96  justify-between border-2 border-lime-200 bg-lime-50 rounded-lg gap-x-4 p-4'>
        <h1 className="text-3xl text-lime-600 mb-4">Log In</h1>

        
        
          <Formik
            initialValues={{
              firstName: '',
              password: '',
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form className='flex flex-col sm:bg-lime-200 sm:p-8 rounded-lg sm:gap-y-2'>
              <label 
                className="text-xl text-lime-600"
                htmlFor="username"
              >
                Username
              </label>
              <Field 
                id="username" 
                name="username" 
                placeholder="Jane"
                className="px-1"
              >
              </Field>
              <label 
                className="text-xl text-lime-600"
                htmlFor="password"
              >
                Password
              </label>
              <Field 
                id="password" 
                name="password" 
                placeholder=""
                type="password"
                className="px-1"
              >  
              </Field>
              
              <button 
                type='submit'
                className='self-end mt-2 py-1 px-2 rounded-xl bg-lime-500 text-lime-200'
              >
                Submit
              </button>
            </Form>
          </Formik>
      </div>
    </div>

  )
}

export default Accounts
