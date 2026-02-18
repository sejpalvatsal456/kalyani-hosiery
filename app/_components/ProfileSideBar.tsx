import { useRouter } from 'next/navigation';
import React from 'react'
import { BiSolidLogOut } from 'react-icons/bi';
import { FaUserEdit } from 'react-icons/fa'

export default function ProfileSideBar(
  { section, setSection } : {
    section: string;
    setSection: (val: string) => void;
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

  return (
    <div className='w-[20vw] h-[87vh] border-r-1 border-gray-300 flex flex-col justify-between py-10'>
      <div>
        <ul>
          <li className='py-3 pl-10 flex items-center gap-5 text-lg cursor-pointer hover:bg-gray-100'>
            <FaUserEdit size={25} />
            Edit Profile
          </li>
        </ul>
      </div>
      <div onClick={handleLogoutClick} className='py-3 pl-10 flex items-center gap-5 text-lg cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 '>
        <BiSolidLogOut size={25} />
        Logout
      </div>
    </div>
  )
}
