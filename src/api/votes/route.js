import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export async function POST(request, response) {
  try {
    const { postId, userId } = response.params;

    if (!postId || !userId) {
      return NextResponse.json({
        success: false,
        error: "You must provide a post ID and a user ID.",
      });
    }

    const existingVote = await prisma.vote.findFirst({
      where: { postId: postId, userId: userId },
    });

    if (existingVote) {
      return NextResponse.json({
        success: false,
        message: "This user has already voted on this post.",
      });
    }

    const newVote = await prisma.vote.create({
      data: { postId: postId, userId: userId, value: 1 },
    });

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { votes: { increment: 1 } },
    });

    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
