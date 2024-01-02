import { prisma } from '@/app/lib/prisma.js';

export default async function handleVote(postId, voteType) {
  try {
    const votes = await prisma.post.findMany({
      where: {
        postId: postId,
      },
      include: {
        post: true,
        user: true,
      },
    });

    if (votes) {
      return { success: true, message: 'Vote successful', votes: votes };
    } else {
      return { success: false, error: 'Failed to create vote' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}