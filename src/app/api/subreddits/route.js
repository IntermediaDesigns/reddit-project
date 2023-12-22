import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const subreddits = await prisma.subreddit.findMany();
      res.json(subreddits);
    } else {
      
    }
    return NextResponse.json({ success: true, message: "Subreddit successful" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
