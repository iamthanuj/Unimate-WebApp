import React from 'react'
import WhiteLogo from '../assets/whiteLogo.png'
import homeFriends from '../assets/design/homeFriends.png'
import UserAvatar from './UserAvatar'


function NavBar() {
  return (
    <div className='fixed w-full bg-gradient-to-r from-mainColor to-secendoryColor h-[80px] flex items-center'>
        <div className='container mx-auto flex items-center justify-between'>

            {/* Logo */}
            <div className='flex gap-3'>
                <img src={WhiteLogo} alt="logo" className='w-[120px]  md:w-[200px] object-contain' />
                <img src={homeFriends} className='w-[90px]  md:w-[120px] object-contain' />
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