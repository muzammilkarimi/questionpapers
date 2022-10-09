import { getSession } from "next-auth/react";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  // Check if user is authenticated
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  // Create new home
  if (req.method === "POST") {
    try {
      const { pdf_url, boardId, year, typeId, subject, class_name, author } =
        req.body;
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
      const board = await prisma.boards.findUnique({
        where: { id: boardId },
      });
      const type = await prisma.q_type.findUnique({
        where: { id: typeId },
      });

      const question = await prisma.question.create({
        data: {
          pdf_url,
          boardId: board.id,
          year,
          typeId: type.id,
          subject,
          class_name,
          author,
          ownerId: user.id,
        },
      });
      // console.log(question);
      res.status(200).json(question);
      // console.log(res.status(200));
    } catch (e) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
  // HTTP method not supported!
  else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
