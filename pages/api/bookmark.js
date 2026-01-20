import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { questionId } = req.body;

  if (!questionId) {
    return res.status(400).json({ message: "Missing questionId" });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (req.method === "POST") {
    try {
      const bookmark = await prisma.bookmark.upsert({
        where: {
          userId_questionId: {
            userId: user.id,
            questionId,
          },
        },
        update: {},
        create: {
          userId: user.id,
          questionId,
        },
      });
      return res.status(200).json(bookmark);
    } catch (error) {
      console.error("Bookmark error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.bookmark.delete({
        where: {
          userId_questionId: {
            userId: user.id,
            questionId,
          },
        },
      });
      return res.status(200).json({ message: "Bookmark removed" });
    } catch (error) {
      console.error("Bookmark error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST", "DELETE"]);
    return res.status(405).json({ message: "Method not allowed" });
  }
}
