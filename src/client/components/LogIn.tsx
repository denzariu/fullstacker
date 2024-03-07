import { ReactElement, useEffect, useRef, useState } from 'react'
import { GET_ALL_ACCOUNTS } from '../GraphQL/Queries'
import { useQuery } from '@apollo/client'
import { Field, Form, Formik } from 'formik'
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google'

import { JwtPayload, jwtDecode } from 'jwt-decode'
import { object, string } from 'yup'

const LogInSchema = object().shape({
  email: string().email('Invalid email').required('*'),
  password: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('*'),
});

function LogIn(): ReactElement {
 
  const { data } = useQuery(GET_ALL_ACCOUNTS)
  const [ user, setUser ] = useState<any>();

  const [ credential, setCredential ] = useState<any>(undefined);
  const [ profile, setProfile ] = useState<any>(undefined);
  
  if (data) {
    console.log(data)
  }

  const handleResponse = (response: GoogleCredentialResponse) => {
    //Set Credentials
    setCredential(response.credential)
    console.log("credential set: ", response)

    //Get Profile Info
    if (response.credential) {
      var profileObject = jwtDecode<JwtPayload>(response.credential)
      setProfile(profileObject)
      console.log(profileObject)
      

    }
  };

  const handleErrorResponse = () => {
      console.log('error on auth');
  };

  


  return (
    <div className="flex h-screen bg-green-50 items-center tracking-tight " 
      // justify-center items-center"
    >
      <div className='flex-1 sm:flex mx-8 lg:mx-96  justify-between border-2 border-lime-200 bg-lime-50 rounded-lg gap-x-4 p-4'>
        <h1 className="text-3xl text-lime-600 sm:text-lime-200 mb-4">Log In</h1>

        
        
          <Formik
            enableReinitialize
            validationSchema={LogInSchema}
            initialValues={{
              email: profile ? profile.email : '',
              password: '',
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ errors, touched }) => (
              <Form className='flex flex-col sm:min-w-64 sm:bg-lime-200 sm:p-8 rounded-lg sm:gap-y-2'>
                
                {/* Username */}
                <span className='flex items-center justify-between'>
                  <label 
                    className="text-xl text-lime-600"
                    htmlFor="email"
                  >
                    Username
                  </label>
                  {errors.email && touched.email ? 
                    <div className='self-end text-red-500'>{errors.email}</div>
                  : null}
                 </span>
                <Field 
                  id="email" 
                  name="email" 
                  placeholder="froggy@frogs.com"
                  className="px-1"
                />

                {/* Password */}
                <span className='flex items-center justify-between'>
                  <label 
                    className="text-xl text-lime-600"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {errors.password && touched.password ? 
                    <div className='self-end text-red-500'>{errors.password}</div>
                  : null}
                </span>
                <Field 
                    id="password" 
                    name="password" 
                    placeholder=""
                    type="password"
                    className="px-1"
                />  
                  
                <span className='flex-row flex mt-2 gap-x-2 items-center justify-between'>
                  <button 
                    type='submit'
                    className='self-end py-1 px-2 rounded-xl bg-lime-500 text-lime-50
                            transition-colors duration-300 hover:bg-lime-50 hover:text-lime-500'
                  >
                    Submit
                  </button>
                  <GoogleLogin size='medium' theme='outline' logo_alignment='center' width={100} text='signin'
                    onSuccess={handleResponse} 
                    ux_mode='popup' //redirect?
                    onError={handleErrorResponse} 
                  />
                </span>
              </Form>
            )}
          </Formik>
      </div>
    </div>

  )
}

export default LogIn 
