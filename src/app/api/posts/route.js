import { fetchUser } from '@/app/lib/fetchUser.js';
import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export default async function POST(req, res) {
  try {
    const { title, message, subredditId, parentId } = await req.json();

    const user = await fetchUser();

    const post = await prisma.post.create({
      data: {
        title,
        message,
        userId: user.id,
        subredditId,
        parentId,
      },
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

