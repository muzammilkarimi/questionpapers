import { prisma } from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    return res.status(200).json({ message: "Subscribed successfully", subscriber });
  } catch (error) {
    console.error("Newsletter error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
}
