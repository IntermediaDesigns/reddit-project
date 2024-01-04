import { prisma } from '@/app/lib/prisma.js';
import { fetchUser } from '@/app/lib/fetchUser.js';

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
      vote = await prisma.vote.update({
        where: {
          id: existingVote.id,
        },
        data: {
          isUpvote,
        },
      });
    } else {
      vote = await prisma.vote.create({
        data: {
          userId: user.id,
          postId,
          isUpvote,
        },
      });
    }

    return { success: true, vote };

  } catch (error) {
    return { success: false, error: error.message };
  }
}