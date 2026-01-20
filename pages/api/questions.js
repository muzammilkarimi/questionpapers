import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { prisma } from "../../lib/prisma";
import { nanoid } from "nanoid";

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

    const isNote = typeId === "type_notes";

    // ✅ Validate input
    if (!pdf_url || !typeId || !subject || !class_name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!isNote && (!boardId || !year)) {
      return res.status(400).json({ message: "Board and Year are required for this type" });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    const titleParts = [subject];
    if (year) titleParts.push(year);
    titleParts.push(class_name);
    
    const title = titleParts.join(" ");
    const slug = `${slugify(title)}-${nanoid(6)}`;
    const difficulty = req.body.difficulty || "medium";

    const questionData = {
      title,
      slug,
      difficulty,
      pdf_url,
      type: { connect: { id: typeId } },
      subject,
      class_name,
      author,
      owner: { connect: { id: user.id } },
    };

    if (boardId) {
      questionData.board = { connect: { id: boardId } };
    }

    if (year) {
      questionData.year = parseInt(year);
    }

    const question = await prisma.question.create({
      data: questionData,
    });

    return res.status(200).json(question);
  } catch (err) {
    console.error("Create question error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
