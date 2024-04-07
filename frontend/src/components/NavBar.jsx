import React from 'react'
import WhiteLogo from '../assets/whiteLogo.png'
import homeFriends from '../assets/design/homeFriends.png'
import UserAvatar from './UserAvatar'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <div className='fixed z-10 w-full bg-gradient-to-r from-mainColor to-secendoryColor h-[80px] flex items-center'>
        <div className='container mx-auto flex items-center justify-between px-3'>

            {/* Logo */}
            <div className='flex gap-3'>
                <Link to="/home" className='flex items-center'><img src={WhiteLogo} alt="logo" className='w-[120px]  md:w-[200px] object-contain' /></Link>
                <img src={homeFriends} className='hidden md:block w-[90px]  md:w-[120px] object-contain' />
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