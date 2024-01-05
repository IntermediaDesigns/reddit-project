import { prisma } from '@/app/lib/prisma.js';
import { fetchUser } from '@/app/lib/fetchUser.js';
import { NextResponse } from 'next/server.js';

export async function POST(req, res) {
  try {
    const user = await fetchUser();

    const { postId, isUpvote } = await req.json();

    const existingVote = await prisma.vote.findFirst({
      where: {
        userId: user.id,
        postId,
      },
    });

    let vote;

    if (existingVote) {
      if (existingVote.isUpvote === isUpvote) {
        vote = await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      } else {
        await prisma.vote.update({
          where: {
            id: existingVote.id,
          },
          data: {
            isUpvote: isUpvote,
          },
        });
      }
    } else {
      vote = await prisma.vote.create({
        data: {
          userId: user.id,
          postId,
          isUpvote: isUpvote,
        },
      });
    }

    return NextResponse.json({
      success: true,
      vote,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
