import React from 'react'
import WhiteLogo from '../assets/whiteLogo.png'
import UserAvatar from './UserAvatar'

function NavBar() {
  return (
    <div className='fixed w-full bg-gradient-to-r from-mainColor to-secendoryColor h-[80px] flex items-center'>
        <div className='container mx-auto flex items-center justify-between'>

            {/* Logo */}
            <div>
                <img src={WhiteLogo} alt="logo" className='w-[200px]' />
            </div>
            
            {/* user profile */}
            <div>
                <UserAvatar></UserAvatar>
            </div>
        </div>
    </div>
  )
}

export default NavBar 