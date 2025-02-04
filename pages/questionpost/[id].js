import React from "react";
import { useRouter } from "next/router";
import { prisma } from "../../lib/prisma";
import Headerleft from '../../components/headerleft'
import Headerright from '../../components/headerright'
import Sidebar from '../../components/sidebar'
import Head from "next/head";
import Image from "next/image";
const Listedquestion = (question=null) => {



  return (
    <>
      <Head>
        <title>QuestionPaperz.com</title>
        <meta name="description" content="we provide question papers and notes" />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <div className='flex flex-col space-y-2'>
        {/* nav bar */}
        <div className='flex justify-between lg:space-x-2 '>
          <Headerleft />
          <Headerright />
        </div>
        <div className='flex justify-between lg:space-x-2'>
          <div className='flex flex-col bg-back-grey rounded-b-lg rounded-t-lg items-center justify-between w-screen '>
            <div className=' mt-10 mb-3 h-28 w-28 '>
              {question?.board?.logo_url?<Image className='h-26 w-26' src={logo_url} alt="board logo" width={104} height={104} /> : <Image className='h-26 w-26' src='/QP logo.png' alt="board logo" width={104} height={104} />}
            </div>
            <div className='text-center md:space-y-3 '>
              <h1 className='text-3xl font-bold'>{question?.board?.name}</h1>
              <h3 className='font-bold'>{question?.class_name} | {question?.year}</h3>
              <h2 className='font-bold'>{question?.subject}</h2>
            </div>
            <div className='mt-10 '>
              <iframe
                        src={question?.pdf_url}
                        className='w-[30rem] h-[40rem] md:w-[50rem] md:h-[50rem] rounded-xl'
                    >

                    </iframe>
              {/* <object data="/Export Report.pdf" type="application/pdf" className='w-[23rem] h-[40rem] md:w-[50rem] md:h-[50rem] rounded-xl'>
                        <p><b>Example fallback content</b>: This browser does not support PDFs. Please download the PDF to view it: <a href="/Export Report.pdf">Download PDF</a>.</p>
                    </object> */}
            </div>
            <div className='mt-6 p-14 bg-[#D9D9D9] rounded-lg items-center justify-between h-24 w-[23rem] md:w-[50rem] flex'>
              <a href={question?.pdf_url} target={"_blank"} rel="noreferrer">
                <div className="bg-qp-orange flex h-10 w-36 items-center justify-evenly rounded-xl drop-shadow-neo cursor-pointer">
                  <Image src="/download.svg" alt="Download icon" width={24} height={24} />
                  <h3>Download</h3>
                </div>
              </a>
              <div>
                <Image src="/save.svg" alt="save in list icon" width={24} height={24} />
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  );

};
export async function getStaticPaths() {
  // Get all homes IDs from the database
  const questions = await prisma.question.findMany({
    select: { id: true },
    
  });

  return {
    paths: questions.map(question => ({
      params: { id: question.id },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  // Get the current home from the database
  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: {
      board: {
        select: { logo_url: true, name: true },
      },
      // Return all fields
    },
  });

  if (question) {
    return {
      props: JSON.parse(JSON.stringify(question)),
    };
  }

  // return {
  //   notFound: true,
  // };

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
}
export default Listedquestion;
