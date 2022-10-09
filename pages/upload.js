import React from "react";
import { getSession } from 'next-auth/react';
import Uploadform from "../components/uploadform";
import Image from 'next/image'
import Head from 'next/head'
import axios from 'axios';
import Link from 'next/link'
import { IoClose } from "react-icons/io5";
import { prisma } from "../lib/prisma";

export async function getServerSideProps(context) {
  // Get all homes
  const session = await getSession(context);

  // If not, redirect to the homepage
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const board = await prisma.boards.findMany({
  });
  const type = await prisma.q_type.findMany({
  });
  // Pass the data to the Home page
  return {
    props: {
      board: JSON.parse(JSON.stringify(board)),
      type: JSON.parse(JSON.stringify(type)),
    },
  };
}
const Upload = ({ board = [], type = [] }) => {
  const addquestion = (data) => axios.post('/api/questions', data);
  
  return (
    <div className=" space-y-2">
      <Head>
        <title>QuestionPaperz.com</title>
        <meta name="title" content="we provide question papers and notes" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <div className="flex bg-back-grey rounded-b-lg h-20 items-center justify-between w-screen pl-6 pr-10 ">
        <div className="flex items-center justify-center space-x-3">
          <Link href='/'>
            <div>
            <Image className="cursor-pointer" width={40} height={40} src="/logo.svg" alt="questionpapers logo" />
            </div>
          </Link>
          <h3 className="font-bold">Upload Questions or Notes</h3>
        </div>
        <Link href='/'>
          <div className="flex items-center justify-center drop-shadow-2xl bg-qp-orange rounded-full h-10 w-10 cursor-pointer">
            <IoClose className="h-8 w-8" />
          </div>
        </Link>
      </div>
      <div className="w-screen h-screen bg-back-grey p-10">
        <Uploadform boards={board} type={type} buttonText="Submit"
          redirectPath="/uploads"
          onSubmit={addquestion} />
      </div>


    </div>
  );
};

export default Upload;