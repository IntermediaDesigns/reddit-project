import { fetchUser } from '@/app/lib/fetchUser.js';
import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export default async function POST(req, res) {
  try {
    
      const { name } = await req.json();

      const user = await fetchUser();

      const subreddit = await prisma.subreddit.create({
        data: {
           name,
          userId: user.id,
        },
      });
    
    return NextResponse.json({ success: true, subreddit});
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
