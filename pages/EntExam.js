import React from "react";
import Layout from "../components/Layout";
import ListingSection from "../components/ListingSection";
import { prisma } from "../lib/prisma";

import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const questions = await prisma.question.findMany({
    where: {
      OR: [
        { typeId: "type_entrance" },
        { board: { name: { contains: "Entrance", mode: "insensitive" } } },
        { title: { contains: "Exam", mode: "insensitive" } },
        { subject: { contains: "JEE", mode: "insensitive" } },
        { subject: { contains: "NEET", mode: "insensitive" } },
      ]
    },
    include: {
      board: { select: { logo_url: true, name: true } },
      type: { select: { name: true } },
      bookmarkedBy: session?.user ? {
        where: { user: { email: session.user.email } },
        select: { id: true }
      } : false
    },
    orderBy: { createdAt: 'desc' },
    take: 40
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

const EntExam = ({ questions = [] }) => {
  return (
    <Layout title="Entrance Exam Papers | QuestionPaperz.com">
      <ListingSection 
        title="Entrance Exams" 
        subtitle="Prepare for your future with our collection of competitive entrance exam papers."
        questions={questions}
      />
    </Layout>
  );
};

export default EntExam;
