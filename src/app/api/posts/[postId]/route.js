import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';

export async function GET(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'No post with that ID found.',
      });
    }
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found.",
      });
    }

    
    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: { text },
    });
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.findFirst({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found.",
      });
    }

    await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return NextResponse.json({ success: true, message: "Post deleted successfully." });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
