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
  // Get all homes
  const questions = await prisma.question.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
      
    ],
    include: {
      board: {
        select: { logo_url: true, name: true },
      },
      type: {
        select: {
          name: true,
        },
      }, // Return all fields
    },
  });
  // Pass the data to the Home page
  return {
    props: {
      questions: JSON.parse(JSON.stringify(questions)),
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
              <Link href="#">
                <div className="flex justify-center items-center pb-16 pt-5">
                  <div className=" w-32 h-12 border-2 flex justify-center items-center border-black rounded-full cursor-pointer">
                    <p>load more</p>
                  </div>
                </div>
              </Link>
            </div>
            <Sidebar />
          </div>
        </div>
      </div>
    </>
  );
}
