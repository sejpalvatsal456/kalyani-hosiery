import React from 'react'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

export default function Header(
    { visibility }: { visibility: boolean }
) {
  return (
    <div
        className={'h-10 flex justify-between items-center bg-[linear-gradient(90deg,_#efe0c9ff_,_#efe0c9aa)]' + ( visibility ? "" : " hidden" )}
    >
      <ul className='flex items-center gap-10 ml-20'>
        <li><a href="/" target='_black'><FaInstagram size={20} /></a></li>
        <li><a href="/" target='_black'><FaFacebook size={20} /></a></li>
        <li><a href="/" target='_black'><FaYoutube size={20} /></a></li>
      </ul>
      <h1 className='text-sm font-medium'>Welcome to our store</h1>
      <h1></h1>
    </div>
  )
}
