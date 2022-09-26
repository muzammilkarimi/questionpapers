import Head from 'next/head'
import Headerleft from '../components/headerleft'
import Headerright from '../components/headerright'
import Banner from '../components/banner'
import Questionpost from '../components/questionspostcard'
import Image from 'next/image'
import Script from 'next/script'
import Link from 'next/link'



export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Home | QuestionPaperz.com</title>
          <meta name="description" content="we provide question papers and notes" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Script src='/navscript.js' />
        <div className='flex flex-col space-y-2'>
          {/* nav bar */}
          <div className='flex justify-between lg:space-x-2 '>
            <Headerleft />
            <Headerright />
          </div>

          {/* banner section */}
          <div className='flex justify-between lg:space-x-2'>
            <Banner />
            <Headerright />
          </div>


          {/* recent question papers section */}
          <div className='flex justify-between lg:space-x-2 '>
            <div className='flex flex-col bg-back-grey rounded-b-lg rounded-t-lg w-screen'>
              <div className='flex space-x-3 m-10 items-center'>
                <Image
                  src={'/recent.svg'}
                  height={20}
                  width={20}
                />
                <div>Recent Question Papers</div>
              </div>
              <div className='flex flex-wrap justify-center items-center '>
                <Questionpost />
                <Questionpost />
                <Questionpost />
                <Questionpost />
                <Questionpost />
                <Questionpost />
              </div>
              <Link href='#'>
                <div className='flex justify-center items-center pb-16 pt-5'>
                  <div className=' w-32 h-12 border-2 flex justify-center items-center border-black rounded-full cursor-pointer'>
                    <p>load more</p>
                  </div>
                </div>
              </Link>
            </div>
            <Headerright />
          </div>




        </div>

      </div>
    </>
  )
}
