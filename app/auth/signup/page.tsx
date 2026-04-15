import SignupClient from "@/app/_components/SignupClient";

export default async function page(
  { searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }
) {

  const { callbackUrl } = (await searchParams);
  return <SignupClient callbackUrl={callbackUrl} />
  
}
