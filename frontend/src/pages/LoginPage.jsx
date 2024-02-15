import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'
import ColorLogo from '../assets/colorLogo.png'

function LoginPage() {
  return (
    <div className='font-inter'>
        <div className='bg-landing-bg h-screen flex justify-center items-center'>
        <div>
            <div className='bg-white rounded-lg p-9 flex flex-col justify-center items-center gap-2'>
                <div className='mb-3'>
                    <img src={ColorLogo} alt="logo-image" className='w-72 mx-auto mb-3' />
                    <p className='text-center font-bold text-xl'>Connect With Unimate</p>
                </div>
                {/* <Login/> */}
                <Register/>

            </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage