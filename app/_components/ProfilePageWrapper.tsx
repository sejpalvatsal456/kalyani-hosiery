"use client";

import React, { JSX, useState } from "react";
import Navbar from "./Navbar";
import Cart from "./Cart";
import PreviousPurchase from "./PreviousPurchase";
import ChangePasswordPage from "./ChangePasswordPage";
import ChangeNumberPage from "./ChangeNumberPage";
import ManageProfile from "./ManageProfile";
import { IUser, SectionType } from "@/lib/typeDefinitions";
import ProfileSideBar from "./ProfileSideBar";

export default function ProfilePageWrapper({
  callbackUrl,
}: {
  callbackUrl: string;
}) {
  const [search, setSearch] = useState<string>("");
  const [user, setUser] = useState<IUser | null>(null);
  const [section, setSection] = useState<SectionType>("manage_profile");

  const sectionComponents: Record<SectionType, JSX.Element> = {
    manage_profile: <ManageProfile />,
    change_password: <ChangePasswordPage />,
    change_number: <ChangeNumberPage />,
    cart: <Cart />,
    previous_purchase: <PreviousPurchase />,
  };

  return (
    <>
      <Navbar
        displayNavLinks={false}
        categories={null}
        activePage={null}
        setPage={() => {}}
        search={search}
        setSearch={setSearch}
        user={user}
        setUser={setUser}
      />
      <div className="flex flex-col md:flex-row">
        <ProfileSideBar
          section={section}
          setSection={setSection}
          callbackUrl={callbackUrl}
        />
        <div className="w-[100%] md:w-[80vw] h-[87vh]">
          {sectionComponents[section]}
        </div>
      </div>
    </>
  );
}
