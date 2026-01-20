import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  try {
    const { getSession } = require("next-auth/react");
    const session = await getSession({ req });

    const isYear = !isNaN(q) && q.length === 4;

    const questions = await prisma.question.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { subject: { contains: q, mode: "insensitive" } },
          { class_name: { contains: q, mode: "insensitive" } },
          isYear ? { year: parseInt(q) } : {},
        ],
      },
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
      take: 20,
    });

    const formattedQuestions = questions.map(q => ({
      ...q,
      saved: q.bookmarkedBy?.length > 0,
      bookmarkedBy: undefined
    }));

    return res.status(200).json(formattedQuestions);
  } catch (err) {
    console.error("Search error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
