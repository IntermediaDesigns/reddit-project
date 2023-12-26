import { prisma } from "@/app/lib/prisma.js";

export default async function subredditHandler(req, res) {
  try {
    if (req.method === 'POST') {
      const { name } = req.body;

      const subreddit = await prisma.subreddit.create({
        data: {
          name: subreddit.name,
        },
      });

      return NextResponse.json({ success: true, message: "Subreddit created successfully" });
    } else {
      
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
