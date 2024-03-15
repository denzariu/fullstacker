import React from 'react'
import { Redirect, useLocation } from 'wouter'
import Logo from './Logo'

function NotFound() {
  const [location, setLocation] = useLocation();

  // Button redirect behavior
  const navigate = () => {
    setLocation("/login");
  };

  
  return (
    <div className='relative isolate h-screen w-screen bg-blue-400 tracking-tight'>
      <div className='mx-8 sm:mx-auto h-2/3 max-w-2xl rounded-b-full bg-lime-500 border-lime-400 border-4 border-t-0 flex flex-col justify-around items-center space-y-8'>
        <header className='text-8xl text-center text-lime-50'>
          404
          <p className='text-2xl mt-4'>
            Frog is on another lily pad.
          </p>
        </header>
        <button onClick={() => navigate()}
          className='border-2 border-lime-50 hover:bg-lime-600 active:bg-lime-800 py-2 px-4 sm:py-4 sm:px-8 text-md rounded-full text-lime-50'
        >
          Log In
        </button>
      </div>
      <div className='h-1/3 flex items-center'>
        <Logo className='flex-1 h-24 w-24 lg:h-36 lg:w-36 fill-lime-400'/>
      </div>
    </div>
  )
}

export default NotFound
