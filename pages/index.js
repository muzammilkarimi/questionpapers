import Head from 'next/head'
import Headerleft from '../components/headerleft'
import Headerright from '../components/headerright'
import Banner from '../components/banner'
import Image from 'next/image'
import Script from 'next/script'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>Home | QuestionPaperz.com</title>
          <meta name="description" content="we provide question papers and notes" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <Script src='/navscript.js' strategy='afterInteractive' />
        <div className='flex flex-col space-y-2'>

          <div className='flex justify-between lg:space-x-2 '>
            <Headerleft />
            <Headerright />
          </div>
          <div className='flex justify-between lg:space-x-2'>
            <Banner />
            <Headerright />
          </div>
        </div>

      </div>
    </>
  )
}
