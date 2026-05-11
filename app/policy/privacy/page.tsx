import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ['latin'],
  weight: ["700"]
})

const page = () => {
  return (
    <div className='w-[100vw] h-[100vh] bg-[linear-gradient(45deg,_#faeaf1,_#fcf0e2)] flex items-center justify-center'>
      <div className='bg-white p-10 rounded w-[80vw] min-h-[80vh]'>
        <h1 className={'text-4xl ' + caveat.className}>Privacy Policy</h1>
      </div>
    </div>
  )
}

export default page
