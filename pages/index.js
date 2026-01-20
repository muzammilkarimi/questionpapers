import Head from "next/head";
import Layout from "../components/Layout";
import Grid from "../components/grid";
import ListingSection from "../components/ListingSection";
import { prisma } from "../lib/prisma";
import Link from "next/link";
import { FiArrowRight, FiBookOpen, FiFileText, FiAward } from "react-icons/fi";

import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const questions = await prisma.question.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      board: { select: { logo_url: true, name: true } },
      type: { select: { name: true } },
      bookmarkedBy: session?.user ? {
        where: { user: { email: session.user.email } },
        select: { id: true }
      } : false
    },
    take: 12
  });

  const formattedQuestions = questions.map(q => ({
    ...q,
    saved: q.bookmarkedBy?.length > 0,
    bookmarkedBy: undefined
  }));

  return {
    props: {
      questions: JSON.parse(JSON.stringify(formattedQuestions)),
    },
  };
}

export default function Home({ questions = [] }) {
  const features = [
    { icon: FiFileText, title: "Question Papers", desc: "10,000+ past papers for every major board.", color: "bg-blue-50 text-blue-600" },
    { icon: FiBookOpen, title: "Expert Notes", desc: "Curated study materials for quick revision.", color: "bg-orange-50 text-qp-orange" },
    { icon: FiAward, title: "Exam Prep", desc: "Competitive exam resources built for success.", color: "bg-purple-50 text-purple-600" },
  ];

  return (
    <Layout>
      <div className="space-y-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 text-white p-8 sm:p-16 lg:p-24 shadow-2xl">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[40rem] h-[40rem] bg-qp-orange/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[30rem] h-[30rem] bg-blue-500/10 rounded-full blur-[100px]" />
          
          <div className="relative z-10 max-w-3xl space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-qp-orange text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-qp-orange animate-pulse" />
              <span>Free Educational Resources</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tight">
              Master Your Exams with <span className="text-qp-orange">Ease.</span>
            </h1>
            
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Access the largest collection of previous year question papers, high-quality notes, and competitive exam resources in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/Search">
                <button className="btn-primary text-lg px-10 py-4 h-auto">
                  Get Started for Free <FiArrowRight />
                </button>
              </Link>
              <Link href="/upload">
                <button className="btn-secondary bg-white/5 border-white/10 text-white hover:bg-white/10 text-lg px-10 py-4 h-auto">
                  Contribute Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Quick Access */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300">
              <div className={`${f.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform`}>
                <f.icon />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-500">{f.desc}</p>
            </div>
          ))}
        </section>

        {/* Recent Questions */}
        <ListingSection 
          title="Recent Question Papers" 
          subtitle="Stay updated with the latest uploads from students and institutions across the country."
          questions={questions}
        />
        
        {/* Call to Action */}
        <section className="bg-qp-orange rounded-[2.5rem] p-8 sm:p-16 text-center text-white shadow-2xl shadow-qp-orange/20">
          <h2 className="text-3xl sm:text-5xl font-extrabold mb-6">Want to help other students?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Your contributions help thousands of students prepare better. Upload your question papers and notes today.
          </p>
          <Link href="/upload">
             <button className="bg-white text-qp-orange hover:bg-gray-50 font-bold py-4 px-12 rounded-2xl transition-all active:scale-95 shadow-lg">
               Upload Your Paper
             </button>
          </Link>
        </section>
      </div>
    </Layout>
  );
}
