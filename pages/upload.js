import React from "react";
import { getSession } from 'next-auth/react';
import Uploadform from "../components/uploadform";
import Layout from "../components/Layout";
import axios from 'axios';
import { FiUpload } from "react-icons/fi";
import { prisma } from "../lib/prisma";

export async function getServerSideProps(context) {
  const [session, boards, types] = await Promise.all([
    getSession(context),
    prisma.boards.findMany(),
    prisma.q_type.findMany()
  ]);

  return {
    props: {
      session,
      board: JSON.parse(JSON.stringify(boards)),
      type: JSON.parse(JSON.stringify(types)),
    },
  };
}

const Upload = ({ board = [], type = [], session }) => {
  const addquestion = (data) => axios.post('/api/questions', data);

  if (!session) {
    return (
      <Layout title="Login Required | QuestionPaperz.com">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-qp-orange text-5xl">
            <FiUpload />
          </div>
          <div className="space-y-3 max-w-md">
            <h1 className="text-3xl font-extrabold text-gray-900">Sign in to Contribute</h1>
            <p className="text-gray-500 font-medium">To maintain the quality of our community resources, we require users to be signed in before uploading documents.</p>
          </div>
          <button 
            onClick={() => {
              const { signIn } = require("next-auth/react");
              signIn("google");
            }}
            className="btn-primary h-14 px-10 text-lg shadow-xl shadow-qp-orange/20"
          >
            Sign in with Google
          </button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title="Upload Questions or Notes | QuestionPaperz.com">
      <div className="space-y-10">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Contribute a Document
          </h1>
          <p className="text-xl text-gray-500">
            Join thousands of students in building the ultimate educational library. Your contribution makes a difference.
          </p>
        </div>

        <Uploadform 
          boards={board} 
          type={type} 
          buttonText="Complete Contribution"
          redirectPath="/uploads"
          onSubmit={addquestion} 
        />
      </div>
    </Layout>
  );
};

export default Upload;