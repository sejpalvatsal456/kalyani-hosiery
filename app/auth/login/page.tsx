import LoginClient from '@/app/_components/LoginClient';

export default async function page(
  { searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }
) {
  const callbackUrl = (await searchParams).callbackUrl || "";
  return <LoginClient callbackUrl={callbackUrl} />
}