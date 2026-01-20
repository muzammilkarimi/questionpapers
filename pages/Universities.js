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
        { typeId: "type_university" },
        { board: { name: { contains: "University", mode: "insensitive" } } },
        { subject: { contains: "University", mode: "insensitive" } },
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

const Universities = ({ questions = [] }) => {
  return (
    <Layout title="University Question Papers | QuestionPaperz.com">
      <ListingSection 
        title="Universities" 
        subtitle="Access previous year question papers from top universities across the country."
        questions={questions}
      />
    </Layout>
  );
};

export default Universities;
