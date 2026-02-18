"use client";

import React, { useState } from 'react'
import Navbar from '../_components/Navbar';
import { User } from '@/lib/typeDefinitions';
import ProfileSideBar from '../_components/ProfileSideBar';

export default function page() {

  const [search, setSearch]  = useState<string>("");
  const [user, setUser] = useState<User|null>(null);
  const [section, setSection] = useState<string>("edit_profile");
 
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
      <ProfileSideBar section={section} setSection={setSection} />
    </>
  )
}
