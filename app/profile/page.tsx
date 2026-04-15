import ProfilePageWrapper from "../_components/ProfilePageWrapper";

export default async function page(
  { searchParams } : { searchParams: Promise<{ callbackUrl: string }> }
) {

  const callbackUrl = (await searchParams).callbackUrl || "";
 
  return <ProfilePageWrapper callbackUrl={callbackUrl} />
}