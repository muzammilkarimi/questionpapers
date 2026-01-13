import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { pdf_url, boardId, year, typeId, subject, class_name, author } =
      req.body;

    // ✅ Validate input
    if (!pdf_url || !boardId || !year || !typeId || !subject || !class_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const title = `${subject} ${year} ${class_name}`;
    const slug = slugify(title);
    const difficulty = req.body.difficulty || "medium";

    const question = await prisma.question.create({
      data: {
        title,
        slug,
        difficulty,
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
    console.error("Create question error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
