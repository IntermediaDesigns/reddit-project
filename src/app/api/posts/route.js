import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export default async function postHandler(req, res) {
  try {
    if (req.method === 'POST') {
      const posts = await prisma.post.findMany();
      res.json(posts);
    } else {
      
    }
    return NextResponse.json({ success: true, message: "Post successful" });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
