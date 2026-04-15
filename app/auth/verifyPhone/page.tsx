import VerifyPhoneClient from '@/app/_components/VerifyPhoneClient';
import React from 'react'

export default async function VerifyPhonePage(
  { searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }
) {

  const { callbackUrl } = await searchParams; 

  return (
    <>
      <VerifyPhoneClient callbackUrl={callbackUrl} />
    </>
  )
}
