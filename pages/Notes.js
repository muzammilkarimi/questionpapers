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
        { typeId: "type_notes" },
        { title: { contains: "Note", mode: "insensitive" } },
        { subject: { contains: "Note", mode: "insensitive" } },
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

const Notes = ({ questions = [] }) => {
  return (
    <Layout title="Study Notes | QuestionPaperz.com">
      <ListingSection 
        title="Study Notes" 
        subtitle="Concise and comprehensive study notes to help you ace your exams."
        questions={questions}
      />
    </Layout>
  );
};

export default Notes;
