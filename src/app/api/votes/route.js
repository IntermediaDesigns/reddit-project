import { prisma } from '@/app/lib/prisma.js';
import { fetchUser } from '@/app/lib/fetchUser.js';

export default async function POST(req, res) {
  try {

    const user = await fetchUser();
    const { postId, isUpvote } = await req.json();

    const vote = await prisma.vote.create({
      data: {
        userId: user.id,
        postId,
        isUpvote,
      },
    });

    if (vote) {
      return { success: true, vote };
    } else {
      return { success: false, error: 'Failed to create vote' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
}