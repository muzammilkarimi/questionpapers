import { getSession, useSession } from "next-auth/react";
import Layout from "../components/Layout";
import ListingSection from "../components/ListingSection";
import { prisma } from "../lib/prisma";
import { AiOutlineFileDone } from "react-icons/ai";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
      return { props: { session: null, questions: [] } };
    }

    const questions = await prisma.question.findMany({
        where: { owner: { email: session.user.email } },
        orderBy: { createdAt: "desc" },
        include: {
            board: { select: { logo_url: true, name: true } },
            type: { select: { name: true } },
            bookmarkedBy: {
              where: { user: { email: session.user.email } },
              select: { id: true }
            }
        },
    });

    const formattedQuestions = questions.map(q => ({
      ...q,
      saved: q.bookmarkedBy?.length > 0,
      bookmarkedBy: undefined
    }));

    return {
        props: {
            session,
            questions: JSON.parse(JSON.stringify(formattedQuestions)),
        },
    };
}

const Uploads = ({ questions = [], session: serverSession }) => {
    const { data: session, status } = useSession();
    const currentSession = session || serverSession;

    if (status === "loading") {
      return (
        <Layout>
          <div className="min-h-[60vh] flex items-center justify-center">
            <div className="h-12 w-12 border-4 border-gray-200 border-t-qp-orange rounded-full animate-spin" />
          </div>
        </Layout>
      );
    }

    if (!currentSession) {
      return (
        <Layout title="Login Required | QuestionPaperz.com">
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-qp-orange text-5xl">
              <AiOutlineFileDone />
            </div>
            <div className="space-y-3 max-w-md">
              <h1 className="text-3xl font-extrabold text-gray-900">Your Contributions</h1>
              <p className="text-gray-500 font-medium">Please sign in to view and manage the question papers and notes you&apos;ve shared with the community.</p>
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
        <Layout title="Your Uploads | QuestionPaperz.com">
          <ListingSection 
            title="Your Contributions" 
            subtitle="Manage and view the question papers and notes you've shared with the community."
            questions={questions}
          />
        </Layout>
    );
};

export default Uploads;
