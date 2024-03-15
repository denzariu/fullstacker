import { ReactElement, useState } from 'react'
import { CAN_LOGIN, DECODE_TOKEN, ENCODE_TOKEN } from '../GraphQL/Queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Field, Form, Formik } from 'formik'
import { GoogleCredentialResponse, GoogleLogin } from '@react-oauth/google'

import { JwtPayload, jwtDecode } from 'jwt-decode'
import { object, string } from 'yup'
import { Link, useLocation } from 'wouter'

import Logo from './Logo'
import { useCookies } from 'react-cookie'

const LogInSchema = object().shape({
  email: string().email('Invalid email').required('*'),
  password: string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('*'),
});

function LogIn(): ReactElement {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [location, setLocation] = useLocation();
  
  //@ts-ignore
  const [encodeToken, {loadingE, errorE, dataE}] = useLazyQuery(
    ENCODE_TOKEN, 
    { variables: { token: '' }}
  )

  //@ts-ignore
  const [decodeToken, {loadingD, errorD, dataD}] = useLazyQuery(
    DECODE_TOKEN, 
    { variables: { token: '' }}
  )

  //@ts-ignore
  const [canLogIn, {loading, error, data}] = useLazyQuery(
    CAN_LOGIN, 
    { variables: { email: "", password: "", google_auth: "" }}
  )
  
  const [ popup, setPopup ] = useState<string>('');
  

  // Google OATH => Positive Response
  const handleResponse = (response: GoogleCredentialResponse) => {
    //@ts-ignore
    onFormSubmit({ email: "", password: "", credential: response.credential})
  };

  // Google OATH => Error Response
  const handleErrorResponse = () => {
      console.log('error on auth');
  };


  // Backend calls to check validity of the account
  const checkAccount = async (email_user: string, password_user?: string, credential?: string) => {
    const fields = { email: email_user ?? "", password: password_user ?? "", google_auth: credential ?? ""}
    return canLogIn({ variables: fields})
  }

  // Form Submit action
  const onFormSubmit = async (values: any) => {
    const accountExists = await checkAccount(values.email, values.password, values.credential)

    if (accountExists && accountExists.data && accountExists.data.canLogIn) {
      
      const encoded_token = await encodeToken({ variables: { token: values.credential }}) //157s.4.303t.2


      setCookie('user', {email: values.email, session_token: encoded_token.data.encodeToken})
      setLocation("/home");
    }
    else if (!accountExists)
      setPopup("Server is down.")
    else
      setPopup("Email & password combination is incorrect.")
  }



  return (
    <div className="flex h-screen bg-lime-100  tracking-tight align-middle items-center justify-center" 
    >
      <div className='flex-1 flex flex-col sm:flex-row mx-8 lg:mx-52 min-h-[30%] sm:min-h-[50%] sm:max-w-7xl justify-between border-2 border-lime-200 bg-lime-50 rounded-lg gap-x-4 p-4'>
        <div className='sm:flex-2 flex flex-col sm:flex-row sm:space-x-2'>

          <Logo className='h-12 w-12 fill-lime-600 self-center sm:self-start '/>
          <h1 className="text-2xl sm:text-4xl text-lime-600 self-center sm:self-start flex-1 flex items-center font-medium leading-10">
            Log In
          </h1>
          
          {/* Warning - Dev Only */}
          {popup !== '' && 
            <p className='flex-1 flex justify-center items-end line-clamp-1 text-red-500 font-light text-xl'>{popup}</p>
          }
        </div>

        <Formik
          enableReinitialize
          validationSchema={LogInSchema}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values) => {
            onFormSubmit(values)
            // await new Promise((r) => setTimeout(r, 500));
          }}
        >
          {({ errors, touched }) => (
            
            <Form className='flex flex-1 flex-col sm:min-w-64 sm:border-r-2 sm:border-b-2 border-lime-500 sm:bg-lime-200 sm:p-8 lg:p-12 rounded-lg gap-y-2 sm:gap-y-4 justify-center'>
              
              <div className='hidden sm:flex sm:flex-col items-center self-center'>
                <GoogleLogin 
                  shape='pill'
                  size='medium' 
                  theme='outline' 
                  type='standard'
                  logo_alignment='center' 
                  // width={100} 
                  text='signin_with'
                  onSuccess={handleResponse} 
                  ux_mode='popup' //redirect?
                  onError={handleErrorResponse} 
                />
                <p className='relative bottom-[-1.6rem] px-4 bg-lime-200 text-lime-600 font-normal text-sm tracking-tighter pt-4 '>
                  or log in with
                </p>
              </div>

              {/* Email */}
              <div className='sm:border-t-2 sm:border-lime-500 sm:pt-12'>
                <span className='flex items-center justify-between'>
                  <label 
                    className="block text-sm font-medium leading-6 text-lime-600"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  {errors.email && touched.email ? 
                    <div className='self-end text-red-500 font-medium'>{errors.email}</div>
                  : null}
                  </span>
                <Field 
                  id="email" 
                  name="email" 
                  placeholder="froggy@frogs.com"
                  className="w-full p-2 text-green-600 bg-lime-50 rounded-md shadow-sm ring-1 ring-inset ring-lime-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400"
                />
              </div>
              
              {/* Password */}
              <div className=''>  
                <span className='flex items-center justify-between'>
                  <label 
                    className="block text-sm font-medium leading-6 text-lime-600"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  {errors.password && touched.password ? 
                    <div className='self-end text-red-500 font-medium'>{errors.password}</div>
                  : null}
                </span>
                <Field 
                    id="password" 
                    name="password" 
                    placeholder=""
                    type="password"
                    className="w-full p-2 text-green-600 bg-lime-50 rounded-md shadow-sm ring-1 ring-inset ring-lime-200 focus-within:ring-2 focus-within:ring-inset focus-within:ring-lime-400 "
                />  
              </div>
                
              <span className='flex-row flex my-2 gap-x-2 items-center justify-start'>
                <button 
                  type='submit'
                  className='py-[0.15rem] flex-1 px-3 rounded-xl text-lg bg-lime-500 text-lime-50
                          transition-colors duration-150 hover:bg-lime-50 hover:text-lime-500'
                >
                  Log In
                </button>
                <GoogleLogin 
                  shape='circle'
                  size='medium' 
                  theme='outline' 
                  type='icon'
                  logo_alignment='center' 
                  // width={100} 
                  text='signin_with'
                  onSuccess={handleResponse} 
                  ux_mode='popup' //redirect?
                  onError={handleErrorResponse} 
                />
                 
              </span>
              
              <div className='flex-[0.8] flex-col flex justify-end self-end'>
                <p className='text-sm text-lime-600 font-light'>Don't have an account?</p>
                <Link 
                    to='/signup'
                    className=' text-lime-600 mt-1 self-end text-base transition-colors duration-150 hover:text-lime-500'
                >
                  Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>

        
      </div>
    </div>

  )
}

export default LogIn 
