import VerifyPhoneClient from "@/app/_components/VerifyPhoneClient";

export default async function page(
    { searchParams }: { searchParams: Promise<{ callbackUrl?: string }> }
) {

    const callbackUrl = (await searchParams).callbackUrl || "";
    return <VerifyPhoneClient callbackUrl={callbackUrl} />
    
}
