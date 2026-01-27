import React from 'react';
import '@tailwindplus/elements'
import { ElDropdown, ElMenu } from '@tailwindplus/elements/react';
import { FiShoppingCart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';

export default function Navbar(
    { activePage }: { activePage: string }
) {
  return (
    <nav className='flex justify-between items-center bg-red-100 px-20 h-30'>
        <img width={200} className='h-15' src="https://khushbujewellers.com/cdn/shop/files/khushbu_jewellers_logo_1_d016ce61-73cb-4f48-8fb7-8073abc9b45d.png?v=1751370925&width=320" alt="logo" />
        <ul className='flex items-center gap-10'>
            <li className={"hover:font-medium hover:underline underline-offset-3 " + ( activePage === "home" ? "underline" : "" )}>
                <a href="/">Home</a>
            </li>
            <li className='hover:font-medium hover:underline underline-offset-3'>
                <a href="/">Shop By Category</a>
            </li>
            <li className={"hover:font-medium hover:underline underline-offset-3 " + ( activePage === "new arrival" ? "underline" : "" )}>
                <a href="/">New Arrival</a>
            </li>
            <li className={"hover:font-medium hover:underline underline-offset-3 " + ( activePage === "bestsellers" ? "underline" : "" )}>
                <a href="/">Bestsellers</a>
            </li>
            <li className='hover:font-medium hover:underline underline-offset-3'>
                <a href="/">Info</a>
            </li>
            <li className='hover:font-medium hover:underline underline-offset-3'>
                <a href="/">Our Policy</a>
            </li>
        </ul>

        <ul className='flex items-center gap-10'>
            <li>
                <FiShoppingCart size={20} />
            </li>
            <li>
                <FaRegUser size={20} />
            </li>
        </ul>

    </nav>
  )
}
