import { PrismaClient } from '@prisma/client';
import { prisma } from '@/app/lib/prisma.js';
import { NextResponse } from 'next/server.js';


export async function Post (request, response) {
  const { title, message, subredditId, parentId} = await request.json();
  const userPostExists = await prisma.post.findFirst({
    where: { title}
  })

  if (!userPostExists) {
    const post = await prisma.post.create ({
      data: {
        title, message, subredditId, parentId,
      },
    })
    return NextResponse.json ({ success: true,})
  }
}





export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  const { title, message, subredditId, parentId } = req.body;

  const userPostExists = await prisma.post.findFirst({
    orderBy: {
      createdAt: 'desc',
    },
    where: { title },
  });

  if (!userPostExists) {
    const post = await prisma.post.create({
      data: {
        title, message, subredditId, parentId,
      },
    });
    return res.status(200).json({ success: true, post });
  } else {
    return res
      .status(400)
      .json({
        success: false,
        message: 'Post with the same title already exists',
      });
  }
}
