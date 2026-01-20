import React, { useState } from "react";
import { prisma } from "../../lib/prisma";
import axios from "axios";
import { toast } from "react-hot-toast";
import { getSession } from "next-auth/react";
import Layout from "../../components/Layout";
import Image from "next/image";
import { FiDownload, FiBookmark, FiShare2, FiExternalLink } from "react-icons/fi";
import { BsBookmarkFill } from "react-icons/bs";

const Listedquestion = ({ question }) => {
  const [isSaved, setIsSaved] = useState(question?.saved || false);
  const [isSaving, setIsSaving] = useState(false);

  const pageTitle = `${question?.subject}${question?.year ? ` ${question.year}` : ''} - ${question?.board?.name || 'Study Notes'}`;
  const pageDesc = `Download ${question?.subject} ${question?.year || ''} document from ${question?.board?.name || 'our collection'}. Class/Dept: ${question?.class_name}. Free PDF download available on QuestionPaperz.com.`;

  return (
    <Layout title={`${pageTitle} | QuestionPaperz.com`} description={pageDesc}>
      <div className="animate-fade-in space-y-10">
        {/* Header / Info Section */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-8">
          <div className="relative w-32 h-32 rounded-full bg-gray-50 flex items-center justify-center p-4 shadow-inner border-4 border-white">
            {question?.board?.logo_url ? (
              <Image
                src={question.board.logo_url}
                alt={question.board.name}
                width={100}
                height={100}
                objectFit="contain"
              />
            ) : (
              <div className="text-4xl font-black text-qp-orange">{question?.board?.name?.[0]}</div>
            )}
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
              {question?.subject}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-orange-50 text-qp-orange font-bold text-sm border border-orange-100">
                Type: {question?.type?.name || 'Question Paper'}
              </span>
              {question?.year && (
                <span className="px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-bold text-sm border border-blue-100">
                  Year: {question?.year}
                </span>
              )}
              <span className="px-4 py-1.5 rounded-full bg-purple-50 text-purple-600 font-bold text-sm border border-purple-100">
                Class/Dept: {question?.class_name}
              </span>
            </div>
            {question?.board?.name && <p className="text-xl font-medium text-gray-500">{question?.board?.name}</p>}
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href={question?.pdf_url} target="_blank" rel="noreferrer" className="btn-primary px-8 h-14">
              <FiDownload className="text-xl" /> Download PDF
            </a>
            <button 
              className={`btn-secondary px-8 h-14 ${isSaved ? '!text-qp-orange !bg-orange-50 !border-orange-200' : ''}`}
              disabled={isSaving}
              onClick={async () => {
                setIsSaving(true);
                // Optimistic update
                const previousState = isSaved;
                setIsSaved(!previousState);

                try {
                  if (previousState) {
                    await axios.delete("/api/bookmark", { data: { questionId: question.id } });
                    toast.success("Removed from bookmarks");
                  } else {
                    await axios.post("/api/bookmark", { questionId: question.id });
                    toast.success("Saved to bookmarks");
                  }
                } catch (e) {
                   // Rollback on error
                   setIsSaved(previousState);
                   toast.error("Failed to update bookmark. Please sign in.");
                } finally {
                  setIsSaving(false);
                }
              }}
            >
              {isSaved ? <BsBookmarkFill className="text-xl" /> : <FiBookmark className="text-xl" />}
              {isSaved ? 'Saved' : 'Save for Later'}
            </button>
            <button 
              className="btn-secondary px-6 h-14 flex items-center justify-center hover:text-qp-orange transition-colors"
              title="Share document"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: pageTitle,
                    text: `Check out this document: ${question?.subject}`,
                    url: window.location.href,
                  })
                  .then(() => toast.success('Shared successfully'))
                  .catch((error) => console.log('Error sharing', error));
                } else {
                  // Fallback: Copy to clipboard
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied to clipboard!');
                }
              }}
            >
              <FiShare2 className="text-xl" />
            </button>
          </div>
        </div>

        {/* View Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FiExternalLink className="text-qp-orange" /> Document Preview
            </h2>
            <p className="text-sm text-gray-500 hidden sm:block">Scroll through the document below</p>
          </div>
          
          <div className="bg-gray-900 rounded-[2.5rem] p-4 sm:p-8 shadow-2xl overflow-hidden min-h-[600px] flex justify-center">
            {question?.pdf_url ? (
              <iframe
                src={`${question.pdf_url}#toolbar=0`}
                className="w-full h-[600px] sm:h-[800px] rounded-2xl bg-white border-none shadow-inner"
                title="Document viewer"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-white space-y-4">
                <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                <p>Loading document preview...</p>
              </div>
            )}
          </div>
        </div>

        {/* Contribution Credits */}
        <div className="bg-white/50 backdrop-blur-md rounded-3xl p-8 border border-white text-center">
          <p className="text-gray-500">
            Contributed by <span className="font-bold text-gray-900">{question?.author || 'Anonymous'}</span>
          </p>
          <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold">Thank you for supporting the community</p>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const session = await getSession(context);

  const question = await prisma.question.findUnique({
    where: { id: params.id },
    include: {
      board: {
        select: { logo_url: true, name: true },
      },
      type: {
        select: { name: true },
      },
      bookmarkedBy: session?.user ? {
        where: { user: { email: session.user.email } },
        select: { id: true }
      } : false
    },
  });

  if (!question) {
    return {
      notFound: true,
    };
  }

  const formattedQuestion = {
    ...question,
    saved: question.bookmarkedBy?.length > 0,
    bookmarkedBy: undefined
  };

  return {
    props: {
      question: JSON.parse(JSON.stringify(formattedQuestion)),
    },
  };
}

export default Listedquestion;
