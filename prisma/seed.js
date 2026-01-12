import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const subjectsByClass = {
  "8": ["Math", "Science", "English", "History", "Geography"],
  "9": ["Math", "Physics", "Chemistry", "Biology", "English"],
  "10": ["Math", "Physics", "Chemistry", "Biology", "English"],
  "11": ["Physics", "Chemistry", "Math", "Biology", "Economics"],
  "12": ["Physics", "Chemistry", "Math", "Biology", "Computer Science"],
};

const institutions = [
  "CBSE Board",
  "ICSE Council",
  "NCERT",
  "UP Board",
  "Bihar Board",
  "Allen Kota",
  "Aakash Institute",
  "Resonance",
];

const difficulties = ["easy", "medium", "hard"];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function main() {
  console.log("🌱 Seeding realistic dataset...");

  await prisma.question.deleteMany();

  const users = await prisma.user.findMany();
  const boards = await prisma.boards.findMany();
  const types = await prisma.q_type.findMany();

  if (!users.length || !boards.length || !types.length) {
    throw new Error("Users, Boards, and Q_type must exist first.");
  }

  const questions = [];

  for (let i = 0; i < 600; i++) {
    const user = faker.helpers.arrayElement(users);
    const board = faker.helpers.arrayElement(boards);
    const type = faker.helpers.arrayElement(types);

    const className = faker.helpers.arrayElement(["8", "9", "10", "11", "12"]);
    const subject = faker.helpers.arrayElement(subjectsByClass[className]);
    const year = faker.number.int({ min: 2016, max: 2024 });

    const title = `${board.name} Class ${className} ${subject} Question Paper ${year}`;
    const slug = slugify(title + "-" + faker.string.nanoid(6));

    const filename = faker.string.alphanumeric(20) + ".pdf";
    const pdf_url = `https://your-project.supabase.co/storage/v1/object/public/questionpaper/${filename}`;

    questions.push({
      title,
      slug,
      difficulty: faker.helpers.arrayElement(difficulties),
      pdf_url,
      boardId: board.id,
      year,
      typeId: type.id,
      subject,
      class_name: className,
      author: faker.helpers.arrayElement(institutions),
      ownerId: user.id,
    });
  }

  await prisma.question.createMany({ data: questions });

  console.log("✅ Seeded 600 realistic questions");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
