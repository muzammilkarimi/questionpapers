import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { pdf_url, boardId, year, typeId, subject, class_name, author } =
      req.body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const question = await prisma.question.create({
      data: {
        pdf_url,
        boardId,
        year,
        typeId,
        subject,
        class_name,
        author,
        ownerId: user.id,
      },
    });

    return res.status(200).json(question);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
