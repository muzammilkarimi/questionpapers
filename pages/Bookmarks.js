import { getSession } from "next-auth/react";
import Layout from "../components/Layout";
import ListingSection from "../components/ListingSection";
import { prisma } from "../lib/prisma";
import { FiBookmark } from "react-icons/fi";

export async function getServerSideProps(context) {
    const session = await getSession(context);

    if (!session) {
      return { props: { session: null, questions: [] } };
    }

    const bookmarks = await prisma.bookmark.findMany({
        where: { user: { email: session.user.email } },
        include: {
            question: {
                include: {
                    board: { select: { logo_url: true, name: true } },
                    type: { select: { name: true } },
                }
            }
        },
        orderBy: { createdAt: "desc" },
    });

    const questions = bookmarks.map(b => ({
      ...b.question,
      saved: true
    }));

    return {
        props: {
            session,
            questions: JSON.parse(JSON.stringify(questions)),
        },
    };
}

const Bookmarks = ({ questions = [], session }) => {
    if (!session) {
      return (
        <Layout title="Login Required | QuestionPaperz.com">
          <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-8 animate-fade-in">
            <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center text-qp-orange text-5xl">
              <FiBookmark />
            </div>
            <div className="space-y-3 max-w-md">
              <h1 className="text-3xl font-extrabold text-gray-900">Your Bookmarks</h1>
              <p className="text-gray-500 font-medium">Please sign in to view your saved question papers and access your personalized dashboard.</p>
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
        <Layout title="Saved Papers | QuestionPaperz.com">
          <ListingSection 
            title="Saved Papers" 
            subtitle="Access your bookmarked question papers and study materials here."
            questions={questions}
          />
        </Layout>
    );
};

export default Bookmarks;
