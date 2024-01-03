import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';
import { fetchUser } from '@/app/lib/fetchUser.js';


export async function PUT(request, response) {
  try {
    const { postId } = response.params;
    const { title, message } = await request.json();

    const post = await prisma.post.update({
      where: { id: postId },
      data: { 
        title,
        message,
      },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found.",
      });
    }
    
    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function DELETE(request, response) {
  try {
    const { postId } = response.params;

    const post = await prisma.post.delete({
      where: { id: postId },
    });

    if (!post) {
      return NextResponse.json({
        success: false,
        error: "No post with that ID found.",
      });
    }


    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
