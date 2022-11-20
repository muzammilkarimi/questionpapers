import Head from "next/head";
import React from "react";
import Headerleft from "../components/headerleft";
import Headerright from "../components/headerright";
import Sidebar from "../components/sidebar";
const Notes = () => {
  return (
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
          <div className="bg-back-grey rounded-lg w-screen flex flex-col ">
            <div className="pl-8 pt-8 space-y-1">
              <h1 className="text-xl font-medium text-gray-800">Notes</h1>
              <p className="text-gray-500"> </p>
            </div> <div className="flex text-5xl pt-24 justify-center align-center "> Coming Soon...</div> </div>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default Notes;
