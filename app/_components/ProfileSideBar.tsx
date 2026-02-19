import { useRouter } from 'next/navigation';
import React, { JSX } from 'react'
import { BiSolidLogOut, BiSolidPurchaseTag, BiSolidPurchaseTagAlt } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa'
import { FaCartShopping } from 'react-icons/fa6';
import { IoMdArrowRoundBack } from 'react-icons/io';
import Cart from './Cart';
import ManageProfile from './ManageProfile';
import PreviousPurchase from './PreviousPurchase';
import { SectionType } from '@/lib/typeDefinitions';

const allSectionOptions:{tag: SectionType, icon: JSX.Element}[] = [
  { tag: 'manage_profile', icon: <FaUserEdit size={25} /> },
  { tag: 'cart', icon: <FaCartShopping size={25} /> },
  { tag: 'previous_purchase', icon: <BiSolidPurchaseTag size={25} /> },
]

const snakeCaseToCapitilize = (str: SectionType) => {
  let words = str.split('_');
  words = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return words.join(' ');
}

export default function ProfileSideBar(
  { section, setSection, callbackUrl } : {
    section: SectionType;
    setSection: (val: SectionType) => void;
    callbackUrl: string;
  }
) {

  const router = useRouter();

  const handleLogoutClick = async() => {
    const res = await fetch('/api/auth/logout/', { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include" });
    const data = await res.json();
    if (!res.ok) {
      alert(data.msg);
      return;
    }

    router.push("/");
  }

  const handleBackClick = () => {
    router.push(callbackUrl)
  }
  

  return (
    <div className='w-[20vw] h-[87vh] border-r-1 border-gray-300 flex flex-col justify-between py-10'>
      <div>
        <ul className='flex flex-col gap-5'>
          
          {allSectionOptions.map((option, key) => {
            return (
              <li
                key={key}
                onClick={e => setSection(option.tag)}
                className={
                  'py-3 pl-[3vw] flex items-center gap-5 text-lg cursor-pointer hover:bg-gray-100 transtion-all duration-100 ' + (option.tag === section ? "text-[#34cfa9] font-semibold" : "text-black") 
                }
              >
                {option.icon}
                {snakeCaseToCapitilize(option.tag)}
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <div onClick={handleBackClick} className='py-3 pl-10 flex items-center gap-5 text-lg cursor-pointer hover:bg-gray-100 transition-all duration-300 '>
          <IoMdArrowRoundBack size={25} />
          Back
        </div>
        <div onClick={handleLogoutClick} className='py-3 pl-10 flex items-center gap-5 text-lg cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 '>
          <BiSolidLogOut size={25} />
          Logout
        </div>
      </div>
    </div>
  )
}
