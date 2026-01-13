import Head from "next/head";
import Headerleft from "../components/headerleft";
import Headerright from "../components/headerright";
import Sidebar from "../components/sidebar";
import Banner from "../components/banner";
import Grid from "../components/grid";
import Link from "next/link";
import { GrHistory } from "react-icons/gr";
import { prisma } from "../lib/prisma";

export async function getServerSideProps() {
  const questions = await prisma.question.findMany({
    take: 24, // only send 24 to browser
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      subject: true,
      year: true,
      class_name: true,
      pdf_url: true,
      board: {
        select: {
          name: true,
          logo_url: true,
        },
      },
      type: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: {
      questions,
    },
  };
}


export default function Home({ questions = [] }) {
  return (
    <>
      <div>
        <Head>
          <title>QuestionPaperz.com</title>
          <meta name="title" content="we provide question papers and notes" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <div className="flex flex-col space-y-2">
          {/* nav bar */}
          <div className="flex justify-between lg:space-x-2 ">
            <Headerleft />
            <Headerright />
          </div>

          {/* banner section */}
          <div className="flex justify-between lg:space-x-2">
            <Banner />
            <Sidebar/>
          </div>

          {/* recent question papers section */}
          <div className="flex justify-between lg:space-x-2 ">
            <div className="flex flex-col bg-back-grey rounded-b-lg rounded-t-lg w-screen">
              <div className="flex space-x-3 m-10 items-center">
                <GrHistory className="w-5 h-5 shrink-0 text-black" />
                <div>Recent Question Papers</div>
              </div>
              <div className="">
                <Grid questions={questions} />
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
