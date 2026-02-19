"use client";

import React, { JSX, useState } from 'react'
import Navbar from './Navbar';
import ProfileSideBar from './ProfileSideBar';
import { SectionType, User } from '@/lib/typeDefinitions';
import ManageProfile from './ManageProfile';
import Cart from './Cart';
import PreviousPurchase from './PreviousPurchase';

const sectionComponents:Record<SectionType, JSX.Element> = {
  'manage_profile': <ManageProfile />,
  'cart': <Cart />,
  'previous_purchase': <PreviousPurchase />
};

export default function ProfilePageWrapper(
  { callbackUrl } : { callbackUrl: string }
) {

  const [search, setSearch]  = useState<string>("");
  const [user, setUser] = useState<User|null>(null);
  const [section, setSection] = useState<SectionType>("manage_profile");
  

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
      <div className='flex'>
        <ProfileSideBar section={section} setSection={setSection} callbackUrl={callbackUrl} />
        <div className='w-[80vw] h-[87vh]'>
          {sectionComponents[section]}
        </div>
      </div>
    </>
  )
}
