import React from 'react'
import Votes from './Votes.jsx';
import { prisma } from '@/app/lib/prisma.js';

export async function CheckVotes({post, user}) {

  const voted = await prisma.vote.findFirst({
    where: {
      userId: user.id,
    },
  });
       
  return (
    <>
    <Votes post={post} user={user} voted={voted} />
    </>
  
  )
}

