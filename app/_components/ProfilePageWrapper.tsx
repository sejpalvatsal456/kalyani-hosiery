"use client";

import React, { JSX, useState } from 'react'
import Navbar from './Navbar';
import ProfileSideBar from './ProfileSideBar';
import { SectionType, User } from '@/lib/typeDefinitions';
import ManageProfile from './ManageProfile';
import Cart from './Cart';
import PreviousPurchase from './PreviousPurchase';
import ChangePasswordPage from './ChangePasswordPage';
import ChangeNumberPage from './ChangeNumberPage';



export default function ProfilePageWrapper(
  { callbackUrl } : { callbackUrl: string }
) {

  const [search, setSearch]  = useState<string>("");
  const [user, setUser] = useState<User|null>(null);
  const [section, setSection] = useState<SectionType>("manage_profile");

  const sectionComponents:Record<SectionType, JSX.Element> = {
    'manage_profile': <ManageProfile />,
    'change_password': <ChangePasswordPage />,
    'change_number': <ChangeNumberPage />,
    'cart': <Cart />,
    'previous_purchase': <PreviousPurchase />
  };
  

  return (
    <>
      <Navbar
        activePage="profile"
        search={search}
        setSearch={setSearch}
        setPage={() => {}}
        user={user}
        setUser={setUser}
        displayNavLinks={false}
      />
      <div className='flex flex-col md:flex-row'>
        <ProfileSideBar section={section} setSection={setSection} callbackUrl={callbackUrl} />
        <div className='w-[100%] md:w-[80vw] h-[87vh]'>
          {sectionComponents[section]}
        </div>
      </div>
    </>
  )
}
