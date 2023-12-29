import { prisma } from '@/app/lib/prisma.js';

export default async function getTotalComments(postId) {
       const children = await prisma.post.findMany({
         where: { parentId: postId },
         include: { children: true },
       });
     
       let totalComments = children.length;
     
       for (let child of children) {
         totalComments += await getTotalComments(child.id);
       }
     
       return totalComments;
     }
     